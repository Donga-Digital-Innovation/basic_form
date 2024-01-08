function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    return [r, g, b];
}

function lightenRgb(rgb, amount) {
    return rgb.map(value => Math.min(255, Math.floor(value + 255 * amount)));
}

class hero_component_Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['text']; // 관찰할 속성 지정
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text') {
            this.buttonText = newValue;
            this.updateButtonText();
        }
    }

    updateButtonText() {
        if (this.button) {
            this.button.textContent = this.buttonText;
        }
    }

    connectedCallback(){
        let text = this.getAttribute('text');
        let back_color = this.getAttribute('back-color');
        let color = getComputedStyle(document.documentElement).getPropertyValue(back_color.match(/\(([^)]+)\)/)[1]).trim();
        let rgbColor = hexToRgb(color);
        let light_color = `rgb(${lightenRgb(rgbColor, 0.2).join(', ')})`;

        this.shadowRoot.innerHTML = `
                <style>
                    button {
                        background-color: ${back_color};
                        color: white;
                        font-weight: 700;
                        padding: 9px 17px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                    }

                    button:hover{
                        background-color: ${light_color};
                    }
                </style>
                <button>${text}</button>
            `;
        this.button = this.shadowRoot.querySelector('button');
        this.updateButtonText();
    }
}

customElements.define('hero-button', hero_component_Button);