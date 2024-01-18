class hero_component_Icon_Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['border-color', 'img', 'hover-color', 'fill-color']; // 관찰할 속성 지정
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'hover-color') {
            this.style.setProperty('--hover-color', newValue);
        } else if (name === 'img' && this.img) {
            this.img.src = newValue;
        } else if (name === 'border-color'){
            this.style.setProperty('--border-color', newValue);
        } else if (name === 'fill-color' && this.svg){
            this.svg.children[0].style.fill = newValue;
        }
    }
    
    connectedCallback(){
        let width = this.getAttribute('width');
        let height = this.getAttribute('height');
        let svgData = this.getAttribute('svg-data');
        let angle = this.getAttribute('angle') || '0deg';
        let fill_color = this.getAttribute('fill-color') || 'var(--color-neutral-black-100)';
        let hover_color = this.getAttribute('hover-color');
        let border_color = this.getAttribute('border-color');

        this.style.setProperty('--border-color', border_color);
        this.style.setProperty('--hover-color', hover_color);
        this.style.setProperty('--fill-color', fill_color);

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

                    svg {
                        width: 17px;
                        height: 17px;
                        transform: rotate(${angle});
                    }
                    
                    path {
                        fill: var(--fill-color);
                    }

                    button:hover{
                        border: 1px solid var(--hover-color);
                    }
                </style>
                <button>${svgData}</button>
            `;
        this.button = this.shadowRoot.querySelector('button');
        this.svg = this.shadowRoot.querySelector('svg');
    }
}

customElements.define('hero-icon-button', hero_component_Icon_Button);