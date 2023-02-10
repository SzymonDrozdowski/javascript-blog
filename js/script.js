'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloud-link').innerHTML),
}

const opts = {
  articleSelector : '.post',
  titleSelector :  '.post-title',
  titleListSelector : '.titles',
  articleTagsSelector : '.post-tags .list',
  articleAuthorSelector : '.post-author',
  tagsListSelector : '.tags.list',
  cloudClassCount : 5,
  cloudClassPrefix : 'tag-size-',
  authorsListSelector : '.authors.list',
}

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /*  remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /*  add class 'active' to the clicked link */

  clickedElement.classList.add('active')
  console.log('clickedElement:', clickedElement);

  /*  remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /*  get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector)

  /*  find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle)

  /*  add class 'active' to the correct article */

  targetArticle.classList.add('active')

}




function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector); //[aricle1, article2, article3, article4]
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id'); //#article-3

    /* find the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;//Article 3

    /* create HTML of the link */
    //const link = '<li><a href="#' + articleId + '">' + articleTitle + '</a></li>';//<li><a href="#article-3">Article 3</a></li>
    const linkHTMLData = {id: articleId, title: articleTitle};
    const link = templates.articleLink(linkHTMLData);
    /* insert link into titleList */
    titleList.innerHTML += link; //<li><a href="#article-1">Article 1</a></li><li><a href="#article-2">Article 2</a></li>li><a href="#article-3">Article 3</a></li>
  }

  const links = document.querySelectorAll('.titles a');
  console.log(links)
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

// tags



const calculateTagsParams = function (tags) {
  const params = { min: 99999, max: 0 };
  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

const calculateTagClass = function (count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);

  return opts.cloudClassPrefix + classNumber;
}


function generateTags() {

   /* [NEW] create a new variable allTags with an empty object */
   let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /*  START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opts.articleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' '); //cat sport test -> ['cat', 'sport', 'test']

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      //const tagLinkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      const tagHTMLData = {id: tag, tagName: tag};
      const tagLinkHtml = templates.tagLink(tagHTMLData)
      /* add generated code to html variable */
      html = html + tagLinkHtml;

      /* [NEW] check if this link is NOT already in allTags */
    if(!allTags.hasOwnProperty(tag)){
      /*[NEW] add tag to allTags object */
      allTags[tag] = 1;
    } else {
      allTags[tag]++;
    }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);

  const tagsParams = calculateTagsParams(allTags)
  console.log(tagsParams)

  const allTagsData = {tags: []};
  /* START LOOP for each tag in all tags */
  for(let tag in allTags){
     allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* add html from alltTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('alltagsdata', allTagsData)
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ''); //#tag-cat -> cat

  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {
    /* remove class active */
    tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const relatedLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of relatedLinks) {
    /* add class active */
    tagLink.classList.add('active');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {

  /* find all links to tags */
  const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let allTagsLink of allTagsLinks) {

    /* add tagClickHandler as event listener for that link */
    allTagsLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

//authors





function generateAuthors() {

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const authorsWrapper = article.querySelector(opts.articleAuthorSelector);

    /* get authors*/
    const articleAuthor = article.getAttribute('data-author');

    /* generate HTML of the link */
    // const authorLinkHtml = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
    const authorHTMLData = {id: articleAuthor, authorName: articleAuthor};
    const authorLinkHtml = templates.authorLink(authorHTMLData)
    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = authorLinkHtml;


    if(!allAuthors[articleAuthor]){
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    /*END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(opts.authorsListSelector);

   /* [NEW] create variable for all links HTML code */
   const allAuthorsData = {authors: []};
   /* [NEW] START LOOP: for each author in authorsList */
   for(let author in allAuthors){

    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });

    authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
  }
    /*const authorsLinkHTML = '<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthors[author] + ')</span></a></li>';
    authorsListHTML += authorsLinkHTML
    console.log(allAuthors)

   }
   authorsList.innerHTML = authorsListHTML; */
}

generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
  for (let authorLink of authorLinks) {
    /* remove class active */
    authorLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const relatedLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let authorHrefLink of relatedLinks) {
    /* add class active */
    authorHrefLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const allAuthorsLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for (let allAuthorsLink of allAuthorsLinks) {

    /* add tagClickHandler as event listener for that link */
    allAuthorsLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();