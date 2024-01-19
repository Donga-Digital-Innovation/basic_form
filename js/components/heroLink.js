class hero_component_Hero_Link extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['color', 'fill-color', 'hover-color', 'border-color']; // 관찰할 속성 지정
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color') {
            this.style.setProperty('--text-color', newValue);
        } else if (name === 'fill-color') {
            this.style.setProperty('--fill-color', newValue);
        } else if (name === 'border-color'){
            this.style.setProperty('--border-color', newValue);
        } else if (name === 'hover-color'){
            this.style.setProperty('--hover-color', newValue);
        }
    }
    
    connectedCallback(){
        // 디폴트 값 설정을 넣어놓는 게 좋을 것 같음.
        let text = this.getAttribute('text');
        let link = this.getAttribute('link');
        let svgData = this.getAttribute('svg-data');
        let color = this.getAttribute('color');
        let fill_color = this.getAttribute('fill-color') || "var(--color-neutral-black-100)";
        let hover_color = this.getAttribute('hover-color');
        let border_color = this.getAttribute('border-color');

        this.style.setProperty('--border-color', border_color);
        this.style.setProperty('--hover-color', hover_color);
        this.style.setProperty('--text-color', color);
        this.style.setProperty('--fill-color', fill_color);

        this.shadowRoot.innerHTML = `
                <style>
                    a {
                        font-size: 16px;
                        line-height: 180%;
                        color: var(--text-color);
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                        cursor: pointer;
                        border: 1px solid var(--border-color);
                        border-radius: 2px;
                        padding: 3px 10px;
                        margin: 0;
                        font-weight: 600;
                        text-decoration: none;
                        position: absolute;
                        bottom: 8px;
                        right: 0;
                        display: flex;
                        justify-content: center;
                    }

                    svg {
                        width: 26px;
                        margin-left: 5px;
                    }

                    path {
                        fill: var(--fill-color);
                    }

                    a:hover {
                        border: 1px solid var(--hover-color);
                    }
                    @media all and (max-width: 876px){
                        a {
                            right: 50%; 
                            transform: translateX(50%); 
                            width: calc(100% - 32px); 
                            bottom: 30px; 
                            padding: 14px 0; 
                            box-sizing: border-box;
                        }
                    }
                </style>
                <a href=${link}>${text} ${svgData}</a>
            `;
        this.a = this.shadowRoot.querySelector('a');
        this.svg = this.shadowRoot.querySelector('svg');
    }
}

customElements.define('hero-link', hero_component_Hero_Link);