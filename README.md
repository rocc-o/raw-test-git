# raw-test-git

This blog project is running on my local machine with Eleventy v0.12.1 and Node v14.16.1

---

Purpose of this project:

I have two separate directories, one is /sights/ the other one is /sounds/. I want to run them indipendetly, each one with its own tags.

I want Eleventy to build:

/sights/tags/(all tags for sights);

/sounds/tags/(all tags for sounds).

But instead I get:

/sights/tags/(all tags for sights and sounds);

/sounds/tags/(all tags for sounds and sights).

---

LAST UPDATE:

Infinite gratitude to the man that made this mess of mine to work, Peter deHaan (pdehaan).
Thanks to him, this repo is now available to anyone who needs to run their blog with Eleventy and two separate collections.  

---

Raymond Camden (Thank you very much Raymond), noticed that both tags pages are still paginating over collections, not collections.sights or collections.sounds;
once I've tried to resolve the pagination as above - which is the right change - I get errors.

Raymond noticed that this is because it's exposing another error: the issue is that permalink, as I have it, cannot use dynamic data like that,
and he suggested a workaround: to use eleventyComputed to define the permalink (https://www.11ty.dev/docs/data-computed/#using-a-template-string).

After several attempts there are still errors. Is clear that the problem is my incompetence in how to remove the dynamic value from the front matter.

You can see my original question and suggestions from Raymond Camden on:
https://stackoverflow.com/questions/68814674/eleventy-11ty-tag-list-sorting-for-2-independent-directories
