class hero_component_Icon_Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['border-color', 'img', 'hover-color']; // 관찰할 속성 지정
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'hover-color') {
            this.style.setProperty('--hover-color', newValue);
        } else if (name === 'img' && this.img) {
            this.img.src = newValue;
        } else if (name === 'border-color'){
            this.style.setProperty('--border-color', newValue);
        }
    }
    
    connectedCallback(){
        let width = this.getAttribute('width');
        let height = this.getAttribute('height');
        let img = this.getAttribute('img');
        let alt = this.getAttribute('alt');
        let angle = this.getAttribute('angle') || '0deg';
        let border_color = this.getAttribute('border-color');
        let hover_color = this.getAttribute('hover-color');

        this.style.setProperty('--border-color', border_color);
        this.style.setProperty('--hover-color', hover_color);

        this.shadowRoot.innerHTML = `
                <style>
                    button {
                        cursor: pointer;
                        background-color: transparent;
                        border: 1px solid var(--border-color);
                        padding: 0;
                        border-radius: 100%;
                        width: ${width};
                        height: ${height};
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    button img{
                        width: 17px;
                        transform: rotate(${angle});
                    }

                    button:hover{
                        border: 1px solid var(--hover-color);
                    }
                </style>
                <button><img src="${img}" alt="${alt}" /></button>
            `;
        this.button = this.shadowRoot.querySelector('button');
        this.img = this.shadowRoot.querySelector('img');
    }
}

customElements.define('hero-icon-button', hero_component_Icon_Button);