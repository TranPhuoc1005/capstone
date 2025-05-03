// Anchor link
var offset_PC = 150; /* offset header in PC (px) */
var offset_SP = 80; /* offset header in SP (px) */
function anchorLink(el) {
    const element = document.querySelector(el);
    if (!element) return;
  
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offsetTop = rect.top + scrollTop;
  
    const scrollTo = window.innerWidth > 750
      ? offsetTop - offset_PC
      : offsetTop - offset_SP;
  
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    });
}
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash && document.querySelector(hash)) {
      anchorLink(hash);
    }
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
          e.preventDefault();
          anchorLink(href);
        }
      });
    });
});

// End anchor link

// Scroll TOP
window.addEventListener("load", handleScrollOrLoad);
window.addEventListener("scroll", handleScrollOrLoad);
function handleScrollOrLoad() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // TO-TOP
    if (scrollTop >= 500) {
      document.querySelector(".to-top")?.classList.add("show");
      document.querySelector(".fixed__bot")?.classList.add("show");
    } else {
      document.querySelector(".to-top")?.classList.remove("show");
      document.querySelector(".fixed__bot")?.classList.remove("show");
    }
    // =========== END - TO-TOP ============
}
// End Scroll TOP

// Button active (Lib filter item)
document.addEventListener('DOMContentLoaded', function() {
    var buttonGroups = document.querySelectorAll('.button-group');
    buttonGroups.forEach(function(buttonGroup) {
        buttonGroup.addEventListener('click', function(event) {
            var clickedButton = event.target;
            if (clickedButton.tagName === 'BUTTON') {
                var currentCheckedButton = buttonGroup.querySelector('.is-checked');
                if (currentCheckedButton) {
                    currentCheckedButton.classList.remove('is-checked');
                }
                clickedButton.classList.add('is-checked');
            }
        });
    });
    var grid = document.querySelector('.projects-wrapper');
    var iso = new Isotope(grid, {
        itemSelector: '.projects-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.projects-sizer',
        },
        getSortData: {
            category: '[data-category]',
        },
    });
    var filterFns = {
        numberGreaterThan50: function() {
            var number = this.querySelector('.number').textContent;
            return parseInt(number, 10) > 50;
        },
        ium: function() {
            var name = this.querySelector('.name').textContent;
            return name.match(/ium$/);
        }
    };
    var filterButtons = document.querySelectorAll('#filters button');
    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var filterValue = button.getAttribute('data-filter');
            filterValue = filterFns[filterValue] || filterValue;
            iso.arrange({ filter: filterValue });
        });
    });

    // WOW JS
    var wow = new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 100,
        mobile: true,
        live: true,
        scrollContainer: null,
        resetAnimation: true,
    });
    wow.init();
    // End WOW JS
});