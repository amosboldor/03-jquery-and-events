//  Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};


articleView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      /* TODO: If the select box changes to an option that has a value, we should:
          1. Hide all of the articles
          2. Fade in only the articles that match based on the author
            that was selected. Hint: use an attribute selector to find
            those articles that match the value, and then fade them in.
        */
      $('#articles article').hide();
      console.log($(this).val());
      $('article[data-author=\"' + $(this).val() + '\"]').fadeIn('fast');
    } else {
    /* Otherwise, we should:
        1. Show all the articles except the template */
      $('#articles article').not('.template').fadeIn();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  /* TODO: Just like we do for #author-filter above, we should also handle
  change events on the #category-filter element. Be sure to reset the
  #author-filter while you're at it! */
  $('#category-filter').on('change', function () {
    if ($(this).val()) {
      $('#articles article').hide();
      $('article[data-category=\"' + $(this).val() + '\"]').fadeIn('fast');
    } else {
      $('#articles article').not('.template').fadeIn();
    }
  });
};

articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    /* TODO:
      1. Hide all of the .tab-content sections
      2. Fade in the single .tab-content section that is
        associated with the .tab element's data-content attribute.
    */
    $('.tab-content').hide();
    console.log($(this)[0].attributes[1].value);
    $('main section[id=\"' + $(this)[0].attributes[1].value + '\"]').fadeIn('fast');
  });
};

articleView.setTeasers = function() {
 // Truncate logic to show only first two elements within the article body.
  $('.article-body *:nth-of-type(n+2)').hide();
 /* TODO: Add a delegated event handler to reveal the remaining paragraphs.
   When a .read-on link is clicked, we can:
   1. Prevent the default action of a link.
   2. Reveal everything in that particular article now.
   3. Hide that read-on link!

   STRETCH GOAl!: change the 'Read On' link to 'Show Less'
 */
  $('#articles').on('click', 'article>a', function (e) {
    e.preventDefault();
    console.log(e);
    console.log($(this).parent().find('p'));
    $(this).parent().find('p').fadeIn();
    $(this).hide();
  });
};

// TODO: Invoke all of the above functions (I mean, methods!):

articleView.populateFilters();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.handleMainNav();
articleView.setTeasers();
