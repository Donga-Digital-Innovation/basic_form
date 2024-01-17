class hero_component_Text_Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['color', 'img']; // 관찰할 속성 지정
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color') {
            this.style.setProperty('--text-color', newValue);
        } else if (name === 'img' && this.img) {
            this.img.src = newValue;
        }
    }
    
    connectedCallback(){
        // 디폴트 값 설정을 넣어놓는 게 좋을 것 같음.
        let text = this.getAttribute('text');
        let img = this.getAttribute('img');
        let alt = this.getAttribute('alt');
        let color = this.getAttribute('color');

        this.style.setProperty('--text-color', color);

        this.shadowRoot.innerHTML = `
                <style>
                    button {
                        font-size: 13px;
                        line-height: 100%;
                        color: var(--text-color);
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: transparent;
                        border: none;
                        padding: 0;
                        font-weight: 500;
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                    }

                    button img{
                        width: 14px;
                    }

                    button:hover{
                        text-decoration: underline;
                        text-decoration-thickness: 1px;
                        text-decoration-color: var(--text-color);
                        text-underline-position: under;
                    }
                </style>
                <button>${text} <img src="${img}" alt="${alt}" /></button>
            `;
        this.button = this.shadowRoot.querySelector('button');
        this.img = this.shadowRoot.querySelector('img');
    }
}

customElements.define('hero-text-button', hero_component_Text_Button);