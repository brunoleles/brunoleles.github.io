export default class KeyboardManager {


    KEY_UP: number[] = [38, 87];
    KEY_DOWN: number[] = [40, 83];
    KEY_LEFT: number[] = [37, 65];
    KEY_RIGHT: number[] = [39, 68];

    keydowns: boolean[] = [];

    constructor() {
    }

    bind(html: HTMLElement) {
        html.addEventListener('keydown', this.on_keydonw.bind(this));
        html.addEventListener('keyup', this.on_keyup.bind(this));
    }

    on_keydonw(event: KeyboardEvent) {
        let key = event.keyCode || event.which;
        this.keydowns[key] = true;
        event.preventDefault();
    }

    on_keyup(event: KeyboardEvent) {
        let key = event.keyCode || event.which;
        this.keydowns[key] = false;
        event.preventDefault();
    }

    is_key_down(key: number | number[]): boolean {
        if (key instanceof Array) {
            return key.some(key => this.is_key_down(key));
        }
        return this.keydowns[key] === true;
    }

}