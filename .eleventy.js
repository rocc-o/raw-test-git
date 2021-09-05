
module.exports = function (eleventyConfig) {


  const now = Date.now();
  const livePosts = (post) => post.date <= now;

  eleventyConfig.addFilter("tagsList", (arr = []) => {
    const tagsSet = new Set();
    arr.forEach((item) => item.data.tags?.forEach((tag) => tagsSet.add(tag)));
    return [...tagsSet].sort((b, a) => b.localeCompare(a));
  });

  eleventyConfig.addFilter("inspect", require("util").inspect);


  // SIGHTS - custom collections
  eleventyConfig.addCollection("sights", (collection) => {
    const posts = collection.getFilteredByGlob("./sights/*.njk");
    return [...posts].filter(livePosts).reverse();
  });

  // SOUNDS - custom collections
  eleventyConfig.addCollection("sounds", (collection) => {
    const posts = collection.getFilteredByGlob("./sounds/*.njk");
    return [...posts].filter(livePosts).reverse();
  });

  // generate list of tags respectively for Sights and Sounds
  eleventyConfig.addCollection("sightsTagsList", (collection) => {
    const tagsListFilter = eleventyConfig.getFilter("tagsList");
    const items = collection
      .getFilteredByGlob("./sights/*.njk")
      .filter(livePosts);
    return tagsListFilter(items);
  });

  eleventyConfig.addCollection("soundsTagsList", (collection) => {
    const tagsListFilter = eleventyConfig.getFilter("tagsList");
    const items = collection
      .getFilteredByGlob("./sounds/*.njk")
      .filter(livePosts);
    return tagsListFilter(items);
  });


  // for Latest Articles on homepage
  // this is for index.njk throwing errors saying there is not a "head" filter
    eleventyConfig.addFilter("head", (arr = [], idx = 0) => {
      if (idx < 0) {
        return arr.slice(idx);
      }
      return arr.slice(0, idx);
    });


   // Contributors
   // https://github.com/cfjedimaster/eleventy-demos/tree/master/multiauthor
   // https://www.raymondcamden.com/2020/08/24/supporting-multiple-authors-in-an-eleventy-blog
   eleventyConfig.addFilter("getContributor", (contributors,label) => {
 		let contributor = contributors.filter(a => a.key === label)[0];
 		return contributor;
 	});

 	eleventyConfig.addFilter("getPostsByContributor", (posts,contributor) => {
 		return posts.filter(a => a.data.contributor === contributor);
 	});



  // https://www.11ty.dev/docs/copy/#manual-passthrough-file-copy-(faster)
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // format dates on SIGHTS and SOUNDS Articles
  const dateformat = require("./lib/filters/dateformat");
  eleventyConfig.addFilter("datefriendly", dateformat.friendly);
  eleventyConfig.addFilter("dateymd", dateformat.ymd);

  // "return" in order to keep the previously entered configuration values
  // taken from: https://github.com/11ty/eleventy-base-blog/blob/master/.eleventy.js
  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "liquid"],

    // added
    passthroughFileCopy: true,

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // Opt-out of pre-processing global data JSON files: (default: `liquid`)
    dataTemplateEngine: false,

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
