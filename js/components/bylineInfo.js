class hero_component_Byline_Info extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback(){
        let link_name = this.getAttribute('link-name') || false;
        let part = this.getAttribute('part');
        let names = this.getAttribute('names');
        let linksHtml = link_name ? link_name.split(",").map(v => {
            return `<a href="${v.split(" ")[0]}" target="_blank">${v.split(" ")[1]} </a>`;
        }).join("") : "";
        this.shadowRoot.innerHTML = `
                <style>
                    p {
                        font-family: Inter, 'Spoqa Han Sans Neo', 'sans-serif';
                        text-align: center;
                        margin: 0;
                        font-size: 16px;
                        line-height: 150%;
                        display: flex;
                        width: 100%;
                    }
                    span:nth-child(1) {
                        margin-right: 16px;
                        font-weight: 600;
                        display: inline-block;
                        text-align: left;
                        width: 82px;
                    } 
                    span:nth-child(2) {
                        display: inline-block;
                        width: calc(100% - 100px);
                        text-align: left;
                    }
                    a {
                        color: inherit;
                        text-decoration: none;
                        transition: all 0.5s;
                        margin: 0;
                    }
                    a:hover{
                        color: var(--color-neutral-gray3);
                    }
                    @media all and (max-width: 480px){
                        a {
                            height: auto;
                        }
                    }
                </style>
                <p>
                    <span>${part}</span>
                    <span>
                    ${linksHtml}
                    ${names}
                    </span>
                </p>
            `;
        this.span = this.shadowRoot.querySelector('span');
        this.p = this.shadowRoot.querySelector('p');
        this.a = this.shadowRoot.querySelector('a');
    }
}

customElements.define('byline-info', hero_component_Byline_Info);