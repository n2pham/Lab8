describe("Basic user flow for SPA ", () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5500");
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it("Test1: Initial Home Page - Check for 10 Journal Entries", async () => {
    const numEntries = await page.$$eval("journal-entry", (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it("Test2: Make sure <journal-entry> elements are populated", async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$("journal-entry");
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty("entry");
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) {
        allArePopulated = false;
      }
      if (plainValue.date.length == 0) {
        allArePopulated = false;
      }
      if (plainValue.content.length == 0) {
        allArePopulated = false;
      }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it("Test3: Clicking first <journal-entry>, new URL should contain /#entry1", async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”

    const entry = await page.$$("journal-entry");
    const entry1 = entry[0];
    await entry1.click();
    await page.waitForSelector("entry-page");

    const url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/#entry1");
  }, 10000);

  it("Test4: On first Entry page - checking page header title", async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1”
    const header = await page.$eval("h1", (header) => {
      return header.textContent;
    });

    expect(header == "Entry 1").toBe(true);
  });

  it("Test5: On first Entry page - checking <entry-page> contents", async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    const dataEntry = await page.$("entry-page");
    const dataObject = await page.evaluate(
      (dataEntry) => dataEntry.entry,
      dataEntry
    );
    expect(dataObject).toEqual({
      title: "You like jazz?",
      date: "4/25/2021",
      content:
        "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: "https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455",
        alt: "bee with sunglasses",
      },
    });
  }, 10000);

  it("Test6: On first Entry page - checking <body> element classes", async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const className = await page.$eval("body", (page) => {
      return page.className;
    });

    expect(className).toBe("single-entry");
  });

  it("Test7: Clicking the settings icon, new URL should contain #settings", async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await expect(page).toClick("header > img");
    const url = await page.evaluate(() => location.href);
    expect(url).toMatch("http://127.0.0.1:5500/#settings");
  }, 10000);

  it("Test8: On Settings page - checking page header title", async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header = await page.$eval("h1", (header) => {
      return header.textContent;
    });

    expect(header == "Settings").toBe(true);
  });

  it("Test9: On Settings page - checking <body> element classes", async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const classID = await page.$eval("body", (body) => {
      return body.classList;
    });

    expect(classID[0]).toMatch("settings");
  }, 10000);

  it("Test10: Clicking the back button, new URL should be /#entry1", async () => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    const url = await page.url();
    expect(url).toMatch("http://127.0.0.1:5500/#entry1");
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it("Test11: Clicking the back button once should bring the user back to the home page", async () => {
    await page.goBack();
    const url = await page.url();
    expect(url).toMatch("http://127.0.0.1:5500/");
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it("Test12: When the user if on the homepage, the header title should be “Journal Entries", async () => {
    const header = await page.$eval("h1", (header) => {
      return header.textContent;
    });
    expect(header == "Journal Entries").toBe(true);
  });
  // define and implement test13: On the home page the <body> element should not have any class attribute
  it("Test13: On the home page the <body> element should not have any class attribute", async () => {
    const classID = await page.$eval("body", (body) => {
      return body.className;
    });

    expect(classID).toBe("");
  });
  // define and implement test14: Verify the url is correct when clicking on the second entry
  it("Test14: Verify the url is correct when clicking on the second entry", async () => {
    const entry = await page.$$("journal-entry");
    const entry2 = entry[1];
    await entry2.click();
    await page.waitForSelector("entry-page");

    const url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/#entry2");
  }, 10000);
  // define and implement test15: Verify the title is current when clicking on the second entry
  it("Test15: Verify the title is current when clicking on the second entry", async () => {
    const header = await page.$eval("h1", (header) => {
      return header.textContent;
    });

    expect(header == "Entry 2").toBe(true);
  });
  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it("Test16: Verify the entry page contents is correct when clicking on the second entry", async () => {
    const dataEntry = await page.$("entry-page");
    const dataObject = await page.evaluate(
      (dataEntry) => dataEntry.entry,
      dataEntry
    );
    expect(dataObject).toEqual({
      title: "Run, Forrest! Run!",
      date: "4/26/2021",
      content:
        "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
        alt: "forrest running",
      },
    });
  });
  // create your own test 17
  //test17: Clicking back button once should lead user to homepage & verify URL
  it("Test17: Clicking back button once should lead user to homepage & verify URL", async () => {
    await page.goBack();

    const url = await page.url();
    expect(url).toMatch("http://127.0.0.1:5500/");
  });

  // create your own test 18
  //Test18: Verify the url is correct when clicking on the tenth entry
  it("Test18: Verifying that the new URL contains /#entry10", async () => {
    const entry = await page.$$("journal-entry");
    const entry2 = entry[9];
    await entry2.click();
    await page.waitForSelector("entry-page");

    const url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/#entry10");
  }, 10000);

  // create your own test 19
  //Test19: Check if audio exists on the tenth entry
  it("Test19: Check if audio exists on the tenth entry", async () => {
    const dataEntry = await page.$("entry-page");
    const dataObject = await page.evaluate(
      (dataEntry) => dataEntry.entry,
      dataEntry
    );
    expect(Boolean(dataObject.audio)).toBe(true);
  });

  // create your own test 20
  // test20: Verify the entry page contents is correct when clicking on the tenth entry
  it("Test20: For tenth entry page - checking <entry-page> contents", async () => {
    const dataEntry = await page.$("entry-page");
    const dataObject = await page.evaluate(
      (dataEntry) => dataEntry.entry,
      dataEntry
    );
    expect(dataObject).toEqual({
      title: "No, I am your father",
      date: "5/4/2021",
      content:
        "A long time ago, in a galaxy far, far away... It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the Death Star, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....",
      image: {
        src: "https://starwarsblog.starwars.com/wp-content/uploads/2021/04/star-wars-may-the-4th-2021-TALL-3973202.jpg",
        alt: "may the fourth be with you",
      },
      audio:
        "https://drive.google.com/uc?export=download&id=1luYh909US7ZBFe6uo440Vv_LNnRdnErT",
    });
  });
});
