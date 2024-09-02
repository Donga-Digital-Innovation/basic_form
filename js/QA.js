//메모 갯수 변수 선언
let MemoNum;
const ProjectName = "basic-form";

//메모 불러오는 함수
async function fetchDynamoDBData() {
    try {
        const response = await fetch('https://ohlkbhm6fnnu2whoeqinlyqcna0vggyc.lambda-url.ap-southeast-2.on.aws/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        MemoNum = data.count;
        console.log(`Total memos: ${MemoNum}`);

        // 메모를 화면에 표시
        data.memos.forEach(memo => {
            if(memo.ProjectName === ProjectName && memo.State === "ING"){
                displayMemo(memo);
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//메모 렌더링
function displayMemo(memo) {
    const memoArea = document.querySelector('.memo-area');
    
    const memoDiv = document.createElement('div');
    memoDiv.className = 'memo';
    memoDiv.style.left = `${memo.positionX}px`;
    memoDiv.style.top = `${memo.positionY}px`;
    memoDiv.style.display = 'none';

    memoDiv.innerHTML = `
        <textarea data-num=${memo.MemoNum} readonly>${memo.Memo}</textarea>
        <button class="delete-btn">삭제</button>
        <button class="complete-btn">완료</button>
        <button class="toggle-btn">-</button>
        `;

    memoArea.appendChild(memoDiv);

    const toggleBtn = memoDiv.querySelector(".toggle-btn");
    toggleBtn.addEventListener('click', function() {
        const textarea = memoDiv.querySelector('textarea');
        if (textarea.style.display === 'none') {
            memoDiv.querySelector('.complete-btn').style.display = 'block';
            memoDiv.querySelector('.delete-btn').style.display = 'block';
            textarea.style.display = 'block';  // 메모를 펼침
            toggleBtn.textContent = '-';  // 닫기 버튼으로 변경
        } else {
            memoDiv.querySelector('.complete-btn').style.display = 'none';
            memoDiv.querySelector('.delete-btn').style.display = 'none';
            textarea.style.display = 'none';  // 메모를 접음
            toggleBtn.textContent = '+';  // 열기 버튼으로 변경
        }
    });

    // 메모 삭제 기능
    const deleteBtn = memoDiv.querySelector(".delete-btn");
    deleteBtn.addEventListener('click', async function() {
        const memoTextarea = memoDiv.querySelector('textarea');
        const memoNum = memoTextarea.getAttribute('data-num');
        const memoContent = memoTextarea.value;

        try {
            const deleteData = `MemoNum=${memoNum}&Memo=${encodeURIComponent(memoContent)}&State=DELETE`;
            const deleteResponse = await fetch('https://7x4zqeie27wx5nae2l3jamxio40hcbgw.lambda-url.ap-southeast-2.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: deleteData,
            });

            if (!deleteResponse.ok) {
                throw new Error('Network response was not ok');
            }

            console.log('Memo deleted');
            MemoNum--
            memoDiv.remove();  // 메모를 화면에서 제거
        } catch (error) {
            console.error('Error deleting memo:', error);
        }
    });

    // 완료 버튼 클릭 이벤트 추가
    const completeBtn = memoDiv.querySelector(".complete-btn");
    completeBtn.addEventListener('click', async function() {
        const memoTextarea = memoDiv.querySelector('textarea');
        const memoNum = memoTextarea.getAttribute('data-num');
        const memoContent = memoTextarea.value;
    
        try {
            const updateData = `MemoNum=${memoNum}&Memo=${encodeURIComponent(memoContent)}&State=COM`;
            const updateResponse = await fetch('https://7x4zqeie27wx5nae2l3jamxio40hcbgw.lambda-url.ap-southeast-2.on.aws/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: updateData,
            });
    
            if (!updateResponse.ok) {
                throw new Error('Network response was not ok');
            }
    
            console.log('Memo updated to complete');
            memoDiv.remove();  // 완료된 메모를 화면에서 제거
        } catch (error) {
            console.error('Error updating memo state:', error);
        }
    });
}

//메모 불러오는 함수 실행
window.onload = fetchDynamoDBData;

//메모모드 변수 선언
let memoModeActive = false;

//메모모드 온 오프 함수
document.querySelector('.toggle-memo-mode').addEventListener('click', function() {
    memoModeActive = !memoModeActive;
    document.querySelector('.memo-area').classList.toggle('memo-mode-active', memoModeActive);
    
    if (memoModeActive) {
        this.textContent = "메모 모드 끄기";
    } else {
        this.textContent = "메모";
    }

    // 메모 display 설정
    const memos = document.querySelectorAll('.memo');
    memos.forEach(memo => {
        memo.style.display = memoModeActive ? 'flex' : 'none';
    });
});

//메모 추가 함수
document.querySelector('.memo-area').addEventListener('contextmenu', function(event) {
    if (!memoModeActive) return;

    //기존 오른쪽 버튼 기능 제어
    event.preventDefault();

    //메모 부분 클릭 방지
    if (event.target.closest('.memo') || event.target.classList[0] === 'toggle-memo-mode') {
        return;
    }

    //메모 body 부분 준비
    const memoArea = event.currentTarget;
    const x = event.clientX - memoArea.offsetLeft + window.scrollX;
    const y = event.clientY - memoArea.offsetTop + window.scrollY;

    //메모 생성
    const memo = document.createElement('div');
    memo.className = 'memo';
    memo.style.left = `${x}px`;
    memo.style.top = `${y}px`;
    console.log(MemoNum);

    //메모 HTML 삽입
    memo.innerHTML = `
        <textarea placeholder="메모를 입력하세요..."></textarea>
        <button class="save-btn">저장</button>
        <button class="close-btn">&times;</button>
        `;
        // <input type="file" class="image-upload" accept="image/*,video/*">
        // <input type="text" class="video-url" placeholder="동영상 URL 입력">

    memoArea.appendChild(memo);

    //메모 DB에 저장
    memo.querySelector('.save-btn').addEventListener('click', async function() {
        MemoNum++;
        const memoContent = memo.querySelector('textarea').value;
        const data = `MemoNum=${MemoNum}&ProjectName=${ProjectName}&State=ING&Memo=${encodeURIComponent(memoContent)}&positionX=${x}&positionY=${y}`;

        try {
            const response = await fetch('https://7x4zqeie27wx5nae2l3jamxio40hcbgw.lambda-url.ap-southeast-2.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: data,
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            console.log('Memo saved:', responseData.message);

            // 저장 후 버튼 변경
            memo.querySelector('textarea').setAttribute('data-num', MemoNum);
            memo.querySelector('textarea').readOnly = true;
            memo.querySelector('.save-btn').remove();  // 저장 버튼 삭제
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '삭제';
            const completeBtn = document.createElement('button');
            completeBtn.className = 'complete-btn';
            completeBtn.textContent = '완료';

            memo.querySelector('.close-btn').before(deleteBtn);
            memo.querySelector('.close-btn').before(completeBtn);

            // 메모 열기/닫기 버튼으로 변경
            memo.querySelector('.close-btn').remove();
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-btn';
            toggleBtn.textContent = '-';  // 초기에는 메모를 닫기 기능으로 변경
            memo.querySelector('.complete-btn').after(toggleBtn);
            toggleBtn.addEventListener('click', function() {
                const textarea = memo.querySelector('textarea');
                if (textarea.style.display === 'none') {
                    memo.querySelector('.complete-btn').style.display = 'block';
                    memo.querySelector('.delete-btn').style.display = 'block';
                    textarea.style.display = 'block';  // 메모를 펼침
                    toggleBtn.textContent = '-';  // 닫기 버튼으로 변경
                } else {
                    memo.querySelector('.complete-btn').style.display = 'none';
                    memo.querySelector('.delete-btn').style.display = 'none';
                    textarea.style.display = 'none';  // 메모를 접음
                    toggleBtn.textContent = '+';  // 열기 버튼으로 변경
                }
            });

            // 메모 삭제 기능
            deleteBtn.addEventListener('click', async function() {
                const memoTextarea = memo.querySelector('textarea');
                const memoNum = memoTextarea.getAttribute('data-num');
                const memoContent = memoTextarea.value;

                try {
                    const deleteData = `MemoNum=${memoNum}&Memo=${encodeURIComponent(memoContent)}&State=DELETE`;
                    const deleteResponse = await fetch('https://7x4zqeie27wx5nae2l3jamxio40hcbgw.lambda-url.ap-southeast-2.on.aws/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'text/plain',
                        },
                        body: deleteData,
                    });

                    if (!deleteResponse.ok) {
                        throw new Error('Network response was not ok');
                    }

                    console.log('Memo deleted');
                    MemoNum--
                    memo.remove();  // 메모를 화면에서 제거
                } catch (error) {
                    console.error('Error deleting memo:', error);
                }
            });

            // 완료 버튼 클릭 이벤트 추가
            completeBtn.addEventListener('click', async function() {
                const memoTextarea = memo.querySelector('textarea');
                const memoNum = memoTextarea.getAttribute('data-num');
                const memoContent = memoTextarea.value;
            
                try {
                    const updateData = `MemoNum=${memoNum}&Memo=${encodeURIComponent(memoContent)}&State=COM`;
                    const updateResponse = await fetch('https://7x4zqeie27wx5nae2l3jamxio40hcbgw.lambda-url.ap-southeast-2.on.aws/', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'text/plain',
                        },
                        body: updateData,
                    });
            
                    if (!updateResponse.ok) {
                        throw new Error('Network response was not ok');
                    }
            
                    console.log('Memo updated to complete');
                    memo.remove();  // 완료된 메모를 화면에서 제거
                } catch (error) {
                    console.error('Error updating memo state:', error);
                }
            });

        } catch (error) {
            console.error('Error saving memo:', error);
        }
    });

    // 저장 되기 전 메모 삭제 기능
    memo.querySelector('.close-btn').addEventListener('click', function() {
        memo.remove();
    });

    // 메모 클릭시 텍스트 영역이 자동으로 포커스되도록
    memo.querySelector('textarea').focus();
});