'use strict';


function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active')
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector)

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle)

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active')

}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

//next script

function generateTitleLinks(){

  /*[DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /*[DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector); //[aricle1, article2, article3, article4]
  for(let article of articles) {

    /*[DONE] get the article id */
    const articleId = article.getAttribute("id"); //#article-3

    /*[DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;//Article 3

    /*[DONE] create HTML of the link */
    const link = '<li><a href="#' + articleId + '">' + articleTitle + '</a></li>';//<li><a href="#article-3">Article 3</a></li>

    /*[DONE] insert link into titleList */
    titleList.innerHTML += link; //<li><a href="#article-1">Article 1</a></li><li><a href="#article-2">Article 2</a></li>li><a href="#article-3">Article 3</a></li>
  }

  const links = document.querySelectorAll('.titles a');
  console.log(links)
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

// next script

const optArticleTagsSelector = '.post-tags .list';

function generateTags(){
  /*[DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */
  for (let article of articles) {

    /*[DONE] find tags wrapper */
  const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /*[DONE] make html variable with empty string */
    let html = '';

    /*[DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
      console.log(articleTags)

    /*[DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray)

    /*[DONE] START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /*[DONE] generate HTML of the link */
      const tagLink = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        console.log(tagLink)

      /*[DONE] add generated code to html variable */
      html = html + tagLink;

    /*[DONE] END LOOP: for each tag */
    }

    /*[DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  /*[DONE] END LOOP: for every article: */
  }
}

generateTags();

