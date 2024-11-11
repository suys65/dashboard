// scripts.js
function loadHTML(id, url) {
    fetch(url) // HTML 파일 로드
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then((html) => {
            document.getElementById(id).innerHTML = html; // 특정 ID에 삽입
        })
        .catch((error) => console.error(error));
}

// DOMContentLoaded 이벤트가 발생하면 모듈 로드
document.addEventListener("DOMContentLoaded", function () {
    loadHTML("nav", "./components/nav.html"); // nav 로드
    
});





// 하위 메뉴 토글 기능
function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

function toggleMenu(buttonId, submenuId) {
    document.addEventListener('click', function (event) {
        if (event.target && event.target.id === buttonId) {
            const submenu = document.getElementById(submenuId);
            const submenus = document.querySelectorAll('.nav-submenu');

            // submenus를 순회하며 필요한 작업 수행
            submenus.forEach(submenu => {
                submenu.style.display = 'none';
            });
            
            if (submenu.style.display === 'none' || submenu.style.display === '') {
                submenu.style.display = 'block'; // 하위 메뉴 표시
            } else {
                submenu.style.display = 'none'; // 하위 메뉴 숨기기
            }
        }
    });
}

// grade 버튼과 하위 메뉴를 변수화하여 전달
toggleMenu('grade-btn', 'grade-submenu');
toggleMenu('graduation-btn', 'graduation-submenu');
toggleMenu('admission-btn', 'admission-submenu');

const Title = document.getElementById('title');
// '학점' 버튼 클릭 시 학과별 학점, 연도별 학점 버튼 표시 및 하위 메뉴 숨김
document.addEventListener('click', function (event) {
    if (event.target && event.target.id ==='score-btn') {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');

        // 사이드바 표시 여부를 토글
        sidebar.style.display = 'block';
        mainContent.classList.add('toggled');
        mainContent.style.display = 'block'; 
        const gradeSubmenu = document.getElementById('grade-submenu');
        const dashboardTitle = document.getElementById('dashboard-title');
        gradeSubmenu.style.display = 'none';  // 하위 메뉴 숨기기
        dashboardTitle.style.display = 'none';  // 최종 업데이트 일시 숨기기
        Title.textContent = this.textContent;
    } 
});

const selectedTitle = document.getElementById('selected-title');
const lastUpdatedTitle = document.getElementById('last-updated-title');

var viz;  // Variable to hold the Tableau Viz object
var dashboardBox = document.querySelector('.dashboard-box');

function handleButtonClick(button, tableauURL) {
  
    // 모든 버튼을 선택
    const buttons = document.querySelectorAll('.active-btn');
// 클릭된 버튼은 active 상태로 설정
    button.classList.add('active-btn');
    button.classList.remove('inactive-btn');

    buttons.forEach(btn => {
        if (btn !== button){
            // 나머지 버튼들은 inactive 상태로 설정
        btn.classList.remove('active-btn');
        btn.classList.add('inactive-btn');
        }
    });
    selectedTitle.textContent = button.textContent;
    lastUpdatedTitle.style.display = 'block';

    // Dispose existing viz if it exists
    if (viz) {
        try {
            viz.dispose();
        } catch (error) {
            console.error("Error disposing existing viz:", error);
        }
    }

    // Clear previous content after disposing the viz
    dashboardBox.innerHTML = '';

    const options = {
        width: '100%',
        height: '1000px',
        hideTabs: true,
        hideToolbar: true
    };

    // Create new Tableau Viz
    viz = new tableau.Viz(dashboardBox, tableauURL, options);
}

function side_active(button) {
    // 모든 버튼을 선택
    const buttons = document.querySelectorAll('.sidebar-submenu-btn-active');
    button.classList.add('sidebar-submenu-btn-active');
    button.classList.remove('sidebar-submenu-btn');

    buttons.forEach(btn => {
        // 나머지 버튼들은 inactive 상태로 설정
        if (btn !== button){
            btn.classList.remove('sidebar-submenu-btn-active');
            btn.classList.add('sidebar-submenu-btn');
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    
    const departmentBtn1 = document.getElementById('department-btn');
    const departmentBtn2 = document.getElementById('department-average-btn');
    const yearBtn1 = document.getElementById('year-btn');
    const yearBtn2 = document.getElementById('grade-level-average-btn');

    // '학과별 학점' 버튼
    departmentBtn1.addEventListener('click', function() {
        handleButtonClick(departmentBtn1, 'https://public.tableau.com/views/_17271092566780/sheet4?:language=ko-KR&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link');
        side_active(departmentBtn2)    
    });
    // '학과별 학점' 버튼
    departmentBtn2.addEventListener('click', function() {
        handleButtonClick(departmentBtn1, 'https://public.tableau.com/views/_17271092566780/sheet4?:language=ko-KR&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link');
        side_active(departmentBtn2)
    });

    // '연도별 학점' 버튼
    yearBtn1.addEventListener('click', function() {
        handleButtonClick(yearBtn1, 'https://public.tableau.com/shared/P89KFMRBQ?:display_count=n&:origin=viz_share_link');
        side_active(yearBtn2) 
    });
    yearBtn2.addEventListener('click', function() {
        handleButtonClick(yearBtn1, 'https://public.tableau.com/shared/P89KFMRBQ?:display_count=n&:origin=viz_share_link');
        side_active(yearBtn2) 
    });
});

