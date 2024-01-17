class hero_component_LinkImage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        let link = this.getAttribute('link');
        let src = this.getAttribute('src');
        let alt = this.getAttribute('alt');
        let present = this.getAttribute('present') || false;
        this.shadowRoot.innerHTML = `
                <style>
                    a {
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        overflow: hidden;
                        border: 2px solid ${present ? "var(--color-primary-cyan)" : "var(--color-neutral-gray4)"};
                        border-radius: 2px;
                        pointer-events: ${present ? "none" : "inherit"};
                        margin: 0;
                    }
                    a::before{
                        content: "${present ? "현재 읽고있는 기사" : ""}";
                        z-index: 1;
                        font-size: 16px;
                        color: var(--color-neutral-white-100);
                        position: absolute;
                    }
                    a::after{
                        content: "인터랙티브";
                        font-size: 16px;
                        color: var(--color-neutral-black-100);
                        background-color: var(--color-neutral-white-100);
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        border-radius: 2px 0 0 0;
                        font-weight: 700;
                        padding: 6px 8px;
                    }
                    img {
                        width: 100%;
                        height: auto;
                        z-index: 0;
                        filter: ${present ? "brightness(0.3)" : "none" };
                    }
                    @media all and (max-width: 480px){
                        a {
                            height: auto;
                        }
                        a::after{
                            font-size: 13px;
                            padding: 6px 8px;
                        }
                    }
                </style>
                <a class="link_img" href=${link} target="_blank">
                    <img src=${src} alt=${alt}>
                </a>
            `;
        this.a = this.shadowRoot.querySelector('a');
        this.img = this.shadowRoot.querySelector('img');
    }
}

customElements.define('link-image', hero_component_LinkImage);