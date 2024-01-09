class hero_component_Outline_Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['color', 'back-color']; // 관찰할 속성 지정
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color') {
            this.textColor = newValue;
            this.updateTextColor();
        }
        else if (name === 'back-color') {
            this.backColor = newValue;
            this.updateBackColor();
        }
    }

    updateTextColor() {
        if (this.button) {
            this.button.style.color = this.textColor;
        }
    }

    updateBackColor() {
        if (this.button) {
            this.button.style.backgroundColor = this.backColor;
        }
    }

    connectedCallback(){
        let text = this.getAttribute('text');
        let color = this.getAttribute('color');
        let back_color = this.getAttribute('back-color');
        this.shadowRoot.innerHTML = `
                <style>
                    button {
                        background-color: ${back_color};
                        color: ${color};
                        padding: 9px 17px;
                        border: 1px solid var(--color-neutral-gray4);
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: 700;
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                    }

                    button:hover{
                        border: 1px solid var(--color-neutral-black-100);
                    }
                </style>
                <button>${text}</button>
            `;
        this.button = this.shadowRoot.querySelector('button');
        this.updateTextColor();
        this.updateBackColor();
    }
}

customElements.define('hero-outline-button', hero_component_Outline_Button);