// 1. 導航欄變色
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { navbar.classList.add('nav-black'); } 
    else { navbar.classList.remove('nav-black'); }
});

// 2. 智慧縮放方向 (針對一般卡片)
const allCards = document.querySelectorAll('.card');
allCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        const rect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const edgeThreshold = 100;
        const isLeftEdge = rect.left < edgeThreshold;
        const isRightEdge = rect.right > (windowWidth - edgeThreshold);
        if (isLeftEdge) { card.style.transformOrigin = 'left center'; } 
        else if (isRightEdge) { card.style.transformOrigin = 'right center'; } 
        else { card.style.transformOrigin = 'center center'; }
    });
});

// 3. Top 10 滾輪控制
const top10Row = document.querySelector('.top-10-row');
if (top10Row) {
    top10Row.addEventListener('wheel', (event) => {
        if (event.deltaY !== 0) {
            event.preventDefault();
            top10Row.scrollLeft += event.deltaY * 2;
        }
    });
}

// 4. 通用箭頭控制 + 左箭頭自動隱藏邏輯
const allRowPosters = document.querySelectorAll('.row-posters');
allRowPosters.forEach(row => {
    const leftArrow = row.parentElement.querySelector('.slider-arrow.left');
    if (leftArrow) {
        const checkScroll = () => {
            if (row.scrollLeft > 0) {
                leftArrow.classList.remove('arrow-hidden');
            } else {
                leftArrow.classList.add('arrow-hidden');
            }
        };
        checkScroll();
        row.addEventListener('scroll', checkScroll);
    }
});

// 箭頭點擊滑動邏輯
const arrows = document.querySelectorAll('.slider-arrow');
arrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        const isLeft = arrow.classList.contains('left');
        const container = arrow.parentElement.querySelector('.row-posters');
        if (container) {
            const scrollAmount = window.innerWidth / 2;
            if (isLeft) {
                container.scrollLeft -= scrollAmount;
            } else {
                container.scrollLeft += scrollAmount;
            }
        }
    });
});