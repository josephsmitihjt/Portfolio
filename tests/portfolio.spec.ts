import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function revealAll(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
  });
  await expect(page.locator(".reveal:not(.is-visible)")).toHaveCount(0);
  await expect
    .poll(() =>
      page
        .locator(".reveal")
        .evaluateAll((elements) =>
          elements.every(
            (element) => getComputedStyle(element).opacity === "1",
          ),
        ),
    )
    .toBe(true);
}

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

test("loads real portfolio content and local assets without runtime errors or overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.reload();
  await expect(page).toHaveTitle("Joseph Smith — Senior Product Designer");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Clear");
  await expect(page.locator(".project-card")).toHaveCount(5);
  await revealAll(page);
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every((image) => image.complete && image.naturalWidth > 0),
        ),
    )
    .toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("filters projects and restores the full collection", async ({ page }) => {
  await page
    .getByRole("button", { name: "Design systems", exact: false })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("Figma Initiative");
  await expect(
    page.getByRole("button", { name: "Design systems", exact: false }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Strategy", exact: false }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText(
    "Next-Generation SIEM",
  );
  await page
    .getByRole("button", { name: "Product design", exact: false })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page
    .getByRole("button", { name: "All projects", exact: false })
    .click();
  await expect(page.locator(".project-card")).toHaveCount(5);
});

test("project links navigate to pages and browser Back restores the portfolio", async ({
  page,
}) => {
  await page
    .getByRole("link", {
      name: "View QRadar SOAR Playbooks case study",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/soar-playbooks-project\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "QRadar SOAR Playbooks",
  );
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.goBack();
  await expect(page.locator(".project-card")).toHaveCount(5);
});

test("legacy project links redirect to dedicated pages", async ({ page }) => {
  await page.goto("./?project=ueba");
  await expect(page).toHaveURL(/ueba-project\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "User & Entity Behavior Analytics",
  );
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "User & Entity Behavior Analytics",
  );
});

test("contact dialog contains keyboard focus and restores it on Escape", async ({
  page,
}) => {
  const trigger = page.locator(".button-contact");
  await trigger.click();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

const studies = [
  ["kwikkart-project", "KwikKart"],
  ["soar-playbooks-project", "QRadar SOAR Playbooks"],
  ["ueba-project", "User & Entity Behavior Analytics"],
  ["figma-initiative", "Figma Initiative"],
  ["qradar-ngsiem-project", "Next-Generation SIEM"],
];

for (const [route, title] of studies) {
  test(`${title}: direct links, imagery, sections, responsive layout and accessibility`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(`./${route}/`);
    expect(response?.status()).toBe(200);
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(title);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await revealAll(page);
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every((image) => image.complete && image.naturalWidth > 0),
          ),
      )
      .toBe(true);
    await expect(page.locator(".study-chapter")).toHaveCount(
      route === "ueba-project" ? 4 : 3,
    );
    await page
      .getByRole("navigation", { name: "Case study sections" })
      .getByRole("link", { name: "Impact", exact: true })
      .click();
    await expect(page).toHaveURL(/#outcomes$/);
    for (const theme of ["light", "dark"]) {
      await page.evaluate(
        (theme) => (document.documentElement.dataset.theme = theme),
        theme,
      );
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      ).toEqual([]);
    }
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect
        .poll(
          () =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
          { message: `Overflow at ${width}` },
        )
        .toBe(true);
    }
    await expect(page.locator(".next-project-link")).toHaveAttribute(
      "href",
      /\/$/,
    );
    await page.locator(".next-project-link").click();
    await expect(page.getByRole("heading", { level: 1 })).not.toContainText(
      title,
    );
    await page.getByRole("link", { name: "All projects", exact: true }).click();
    await expect(page).toHaveURL(/#work$/);
    await expect(page.locator(".project-card")).toHaveCount(5);
    expect(errors).toEqual([]);
  });
}

test("toolbar comparison and library layers expose their selected states", async ({
  page,
}) => {
  await page.goto("./soar-playbooks-project/");
  await page.getByRole("button", { name: "Before", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Before", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".comparison-image img")).toHaveAttribute(
    "src",
    /toolbar-before/,
  );
  await page.getByRole("button", { name: "After", exact: true }).click();
  await expect(page.locator(".comparison-image img")).toHaveAttribute(
    "src",
    /toolbar-after/,
  );
  await page.goto("./figma-initiative/");
  await page.getByRole("button", { name: /Final component/ }).click();
  await expect(
    page.getByRole("button", { name: /Final component/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".architecture-detail")).toContainText(
    "final table",
  );
});

test("process accordion exposes the selected step", async ({ page }) => {
  const trigger = page.getByRole("button", {
    name: /Make the complex feel simple/,
  });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", { name: /Make the complex feel simple/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Understand the real problem/ }),
  ).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("region", { name: /Make the complex feel simple/ }),
  ).toBeHidden();
});

test("contact validates required inputs and creates a private message draft", async ({
  page,
}) => {
  await page.locator(".button-contact").click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("link", { name: "Connect on LinkedIn" }),
  ).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/joseph-smith-04a292127/",
  );
  await dialog.getByRole("button", { name: "Create my note" }).click();
  await expect(dialog.getByText("Your note is ready.")).toHaveCount(0);
  await dialog.getByLabel("Your name").fill("Test Designer");
  await dialog.getByLabel("Your email").fill("test@example.com");
  await dialog
    .getByLabel("What’s on your mind?")
    .fill("Let’s discuss a product design opportunity.");
  await dialog.getByRole("button", { name: "Create my note" }).click();
  await expect(dialog.getByLabel("Message preview")).toHaveValue(
    /Hi Joseph Smith,[\s\S]*Test Designer/,
  );
  await expect(dialog.getByText("Your note is ready.")).toBeVisible();
  await dialog.getByRole("button", { name: "Write another note" }).click();
  await expect(dialog.getByLabel("Your name")).toHaveValue("");
});

test("theme preference persists across reload", async ({ page }) => {
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("copies contact notes and shareable case-study URLs", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.locator(".button-contact").click();
  await page.getByLabel("Your name").fill("Test Designer");
  await page.getByLabel("Your email").fill("test@example.com");
  await page
    .getByLabel("What’s on your mind?")
    .fill("A new product opportunity.");
  await page.getByRole("button", { name: "Create my note" }).click();
  await page.getByRole("button", { name: "Copy my note" }).click();
  await expect(page.getByRole("status")).toContainText("Message copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "A new product opportunity.",
  );
  await page.keyboard.press("Escape");
  await page
    .getByRole("link", { name: "View KwikKart case study", exact: true })
    .click();
  await page.getByRole("button", { name: "Copy link" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Case-study link copied",
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "/kwikkart-project/",
  );
});

test("keeps layouts and hero text inside narrow, tablet, and laptop viewports", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.reload();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const textFits = await page.locator("h1").evaluate((heading) => {
      const range = document.createRange();
      range.selectNodeContents(heading);
      return Array.from(range.getClientRects()).every(
        (rect) => rect.right <= window.innerWidth && rect.left >= 0,
      );
    });
    expect(textFits, `Hero text fits at ${width}px`).toBe(true);
  }
});

test("navigation supports the mobile disclosure and section links", async ({
  page,
}, testInfo) => {
  if (testInfo.project.name === "mobile") {
    const menu = page.getByRole("button", { name: "Open navigation" });
    await menu.click();
    await expect(
      page.getByRole("button", { name: "Close navigation" }),
    ).toHaveAttribute("aria-expanded", "true");
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/#about$/);
  if (testInfo.project.name === "mobile")
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
});

test("respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  expect(
    await page
      .locator("html")
      .evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((element) =>
        parseFloat(getComputedStyle(element).animationDuration),
      ),
  ).toBeLessThan(0.01);
  expect(
    await page
      .locator(".reveal")
      .first()
      .evaluate((element) => getComputedStyle(element).opacity),
  ).toBe("1");
});

test("main page meets automated WCAG 2 AA checks in both themes", async ({
  page,
}) => {
  await revealAll(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const light = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(
    light.violations.map((violation) => ({
      id: violation.id,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        summary: node.failureSummary,
      })),
    })),
  ).toEqual([]);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  const dark = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(
    dark.violations.map((violation) => ({
      id: violation.id,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        summary: node.failureSummary,
      })),
    })),
  ).toEqual([]);
});

test("contact dialog meets automated accessibility checks", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator(".button-contact").click();
  const contact = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(
    contact.violations.map((violation) => ({
      id: violation.id,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        summary: node.failureSummary,
      })),
    })),
  ).toEqual([]);
});
