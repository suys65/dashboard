// scripts.js
async function loadHTML(id, url, fallbackUrl = null) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${url}:`, error);

        // 대체 URL이 존재하면 다시 시도
        if (fallbackUrl) {
            console.log(`Trying fallback URL: ${fallbackUrl}`);
            loadHTML(id, fallbackUrl); // 대체 URL로 재시도
        } else {
            // 대체 URL도 없을 경우 기본 에러 메시지
            document.getElementById(id).innerHTML = "<p>Navigation could not be loaded.</p>";
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadHTML("nav", "./components/nav.html", "../components/nav.html");
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
toggleMenu('record-btn', 'record-submenu');
toggleMenu('etc-btn', 'etc-submenu');

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
    try { 
        viz = new tableau.Viz(dashboardBox, tableauURL, options);
    // Create new Tableau Viz
    } catch { 
        dashboardBox.innerHTML = `<img src="${tableauURL}" alt="대체 이미지" style="width: 100%; height: auto;">`;
    }
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

function setupButtonHandlers(button1, button2, link) {
    // 기존 이벤트 리스너 제거 (중복 방지)
    
    button1.replaceWith(button1.cloneNode(true));
    button2.replaceWith(button2.cloneNode(true));

    // 버튼을 다시 가져옴
    const newButton1 = document.getElementById(button1.id);
    const newButton2 = document.getElementById(button2.id);
    
    // 버튼 1 클릭 이벤트
    newButton1.addEventListener('click', function () {
        handleButtonClick(newButton1, link);
        side_active(newButton2); // 버튼 2 활성화
    });

    // 버튼 2 클릭 이벤트
    newButton2.addEventListener('click', function () {
        handleButtonClick(newButton1, link);
        side_active(newButton2); // 버튼 1 활성화
    }); 
}
//입학----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function() {  //신입생
    const major_freshman_btn1 = document.getElementById('major_freshman_btn1');
    const major_freshman_btn2 = document.getElementById('major_freshman_btn2');
    setupButtonHandlers(major_freshman_btn1, major_freshman_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367196286860/1?:origin=card_share_link&:embed=n');

    const exam_freshman_btn1 = document.getElementById('exam_freshman_btn1');
    const exam_freshman_btn2 = document.getElementById('exam_freshman_btn2');
    setupButtonHandlers(exam_freshman_btn1,  exam_freshman_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367196286860/2?:origin=card_share_link&:embed=n');
});

document.addEventListener('DOMContentLoaded', function() {  //신입생성적
    const major_freshscore_btn1 = document.getElementById('major_freshscore_btn1');
    const major_freshscore_btn2 = document.getElementById('major_freshscore_btn2');
    setupButtonHandlers(major_freshscore_btn1, major_freshscore_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/1/1?:origin=card_share_link&:embed=n');

    const exam_freshscore_btn1 = document.getElementById('exam_freshscore_btn1');
    const exam_freshscore_btn2 = document.getElementById('exam_freshscore_btn2');
    setupButtonHandlers(exam_freshscore_btn1, exam_freshscore_btn2, 'https://public.tableau.com/shared/P89KFMRBQ?:display_count=n&:origin=viz_share_link');
});
//성적----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function() {  //전체학점
    const major_allscore_btn1 = document.getElementById('major_allscore_btn1');
    const major_allscore_btn2 = document.getElementById('major_allscore_btn2');
    setupButtonHandlers(major_allscore_btn1, major_allscore_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367386338060/1?:origin=card_share_link&:embed=n');

    const grade_allscore_btn1 = document.getElementById('grade_allscore_btn1');
    const grade_allscore_btn2 = document.getElementById('grade_allscore_btn2');
    setupButtonHandlers(grade_allscore_btn1,  grade_allscore_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367386338060/2?:origin=card_share_link&:embed=n');

});    
    
//기타---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function() {  //교원
      
    const major_prof_btn1 = document.getElementById('major_prof_btn1');
    const major_prof_btn2 = document.getElementById('major_prof_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_prof_btn1, major_prof_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367103142750/3?:origin=card_share_link&:embed=n');
       
    const major_staff_btn1 = document.getElementById('major_staff_btn1');
    const major_staff_btn2 = document.getElementById('major_staff_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_staff_btn1, major_staff_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367103142750/4?:origin=card_share_link&:embed=n');
});

document.addEventListener('DOMContentLoaded', function() {  //교육만족도
      
    const major_satis_btn1 = document.getElementById('major_satis_btn1');
    const major_satis_btn2 = document.getElementById('major_satis_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_satis_btn1, major_satis_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367416114790/1?:origin=card_share_link&:embed=n');
       
});
//학적-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function() {  //자퇴
    
    const major_drop_btn1 = document.getElementById('major_drop_btn1');
    const major_drop_btn2 = document.getElementById('major_drop_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_drop_btn1, major_drop_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367395681030/sheet0?:origin=card_share_link&:embed=n');
        
    const grade_drop_btn1 = document.getElementById('grade_drop_btn1');
    const grade_drop_btn2 = document.getElementById('grade_drop_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(grade_drop_btn1, grade_drop_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367395681030/sheet1?:origin=card_share_link&:embed=n');
});

document.addEventListener('DOMContentLoaded', function() {    //부복수
    const major_indouble_btn1 = document.getElementById('major_indouble_btn1');
    const major_indouble_btn2 = document.getElementById('major_indouble_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_indouble_btn1, major_indouble_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367065782330/sheet0?:origin=card_share_link&:embed=n');
    
    const grade_indouble_btn1 = document.getElementById('grade_indouble_btn1');
    const grade_indouble_btn2 = document.getElementById('grade_indouble_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(grade_indouble_btn1, grade_indouble_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367065782330/-?:origin=card_share_link&:embed=n');

    const major_outdouble_btn1 = document.getElementById('major_outdouble_btn1');
    const major_outdouble_btn2 = document.getElementById('major_outdouble_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_outdouble_btn1, major_outdouble_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367065782330/sheet2?:origin=card_share_link&:embed=n');

    const grade_outdouble_btn1 = document.getElementById('grade_outdouble_btn1');
    const grade_outdouble_btn2 = document.getElementById('grade_outdouble_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(grade_outdouble_btn1, grade_outdouble_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367065782330/sheet3?:origin=card_share_link&:embed=n');

});

document.addEventListener('DOMContentLoaded', function() {    //연계
    const major_inlink_btn1 = document.getElementById('major_inlink_btn1');
    const major_inlink_btn2 = document.getElementById('major_inlink_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_inlink_btn1, major_inlink_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367066728570/sheet0?:origin=card_share_link&:embed=n');
    
    const grade_inlink_btn1 = document.getElementById('grade_inlink_btn1');
    const grade_inlink_btn2 = document.getElementById('grade_inlink_btn2');
    // 함수 호출로 이벤트 핸들러 설정                             
    setupButtonHandlers(grade_inlink_btn1, grade_inlink_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367066728570/-?:origin=card_share_link&:embed=n');

    const major_outlink_btn1 = document.getElementById('major_outlink_btn1');
    const major_outlink_btn2 = document.getElementById('major_outlink_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_outlink_btn1, major_outlink_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367066728570/sheet2?:origin=card_share_link&:embed=n');

    const grade_outlink_btn1 = document.getElementById('grade_outlink_btn1');
    const grade_outlink_btn2 = document.getElementById('grade_outlink_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(grade_outlink_btn1, grade_outlink_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367066728570/sheet3?:origin=card_share_link&:embed=n');

});

document.addEventListener('DOMContentLoaded', function() {    //휴복학
    const major_leavereturn_btn1 = document.getElementById('major_leavereturn_btn1');
    const major_leavereturn_btn2 = document.getElementById('major_leavereturn_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_leavereturn_btn1, major_leavereturn_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367196468810/sheet0?:origin=card_share_link&:embed=n');
    
    const grade_leavereturn_btn1 = document.getElementById('grade_leavereturn_btn1');
    const grade_leavereturn_btn2 = document.getElementById('grade_leavereturn_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(grade_leavereturn_btn1, grade_leavereturn_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17367196468810/sheet1?:origin=card_share_link&:embed=n');

    const major_term_btn1 = document.getElementById('major_term_btn1');
    const major_term_btn2 = document.getElementById('major_term_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_term_btn1, major_term_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_0/sheet6?:origin=card_share_link&:embed=n');

    const grade_term_btn1 = document.getElementById('grade_term_btn1');
    const grade_term_btn2 = document.getElementById('grade_term_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(grade_term_btn1, grade_term_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_0/sheet6?:origin=card_share_link&:embed=n');

});

document.addEventListener('DOMContentLoaded', function() {    //전과
    const major_in_btn1 = document.getElementById('major_in_btn1');
    const major_in_btn2 = document.getElementById('major_in_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_in_btn1, major_in_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17369457531650/1?:origin=card_share_link&:embed=n');
    
    const grade_in_btn1 = document.getElementById('grade_in_btn1');
    const grade_in_btn2 = document.getElementById('grade_in_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(grade_in_btn1, grade_in_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17369457531650/2?:origin=card_share_link&:embed=n');

    const major_out_btn1 = document.getElementById('major_out_btn1');
    const major_out_btn2 = document.getElementById('major_out_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_out_btn1, major_out_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17369457531650/3?:origin=card_share_link&:embed=n');

    const grade_out_btn1 = document.getElementById('grade_out_btn1');
    const grade_out_btn2 = document.getElementById('grade_out_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(grade_out_btn1, grade_out_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17369457531650/4?:origin=card_share_link&:embed=n');

});

//졸업---------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
document.addEventListener('DOMContentLoaded', function() {    //졸업생
    const major_graduate_btn1 = document.getElementById('major_graduate_btn1');
    const major_graduate_btn2 = document.getElementById('major_graduate_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_graduate_btn1, major_graduate_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17366944447350/1_1?:origin=card_share_link&:embed=n');
    
    const major_delay_btn1 = document.getElementById('major_delay_btn1');
    const major_delay_btn2 = document.getElementById('major_delay_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_delay_btn1, major_delay_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_0/sheet6?:origin=card_share_link&:embed=n');

});

document.addEventListener('DOMContentLoaded', function() {    //대학원
    const major_graduatesc_btn1 = document.getElementById('major_graduatesc_btn1');
    const major_graduatesc_btn2 = document.getElementById('major_graduatesc_btn2');
    // 함수 호출로 이벤트 핸들러 설정
    setupButtonHandlers(major_graduatesc_btn1, major_graduatesc_btn2, 'https://prod-apnortheast-a.online.tableau.com/t/inu_dashboard/views/_17366945163500/1_1?:origin=card_share_link&:embed=n');
    
});
//
