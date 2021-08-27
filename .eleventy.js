module.exports = function (eleventyConfig) {
  // SIGHTS - custom collections
  const nowsights = new Date();
  const sightslivePosts = (post) => post.date <= nowsights;
  eleventyConfig.addCollection("sights", (collection) => {
    return [
      ...collection.getFilteredByGlob("./sights/*.njk").filter(sightslivePosts),
    ].reverse();
  });

  eleventyConfig.addFilter("head", (arr = [], idx = 0) => {
    if (idx < 0) {
      return arr.slice(idx);
    }
    return arr.slice(0, idx);
  });

  eleventyConfig.addFilter("tagsList", (arr = []) => {
    const tagsSet = new Set();
    arr.forEach((item) => item.data.tags?.forEach((tag) => tagsSet.add(tag)));
    return [...tagsSet].sort((b, a) => b.localeCompare(a));
  });

  // SOUNDS - custom collections
  const nowsounds = new Date();
  const soundslivePosts = (post) => post.date <= nowsounds;
  eleventyConfig.addCollection("sounds", (collection) => {
    return [
      ...collection.getFilteredByGlob("./sounds/*.njk").filter(soundslivePosts),
    ].reverse();
  });

  // generate a list of all tags collections
  // with alphabetical sorting - had to invert to "b, a" because it was sorting upside down
  // eleventyConfig.addCollection('tagsList', (collectionApi) => {
  //   const tagsSet = new Set()
  //   collectionApi.getAll().forEach((item) => {
  //     if (!item.data.tags) return
  //     item.data.tags.forEach((tag) => tagsSet.add(tag))
  //   })
  //   return  [...tagsSet].sort((b, a) => b.localeCompare(a))
  // });

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
