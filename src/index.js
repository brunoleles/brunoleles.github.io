import './index.css';
import * as Two from 'twojs-ts';

const two = window.two = new Two({
    fullscreen: true,
    autostart: true,
}).appendTo(document.querySelector('body'));

const g = new Two.Vector(0, 0.66);

var main_text = [];
var main_group = two.makeGroup();
var main_rect = two.makeRectangle(0,0, 10, 10);

var chars = [];

window.main_text = main_text;

var styles = {
    family: 'proxima-nova, sans-serif',
    size: 50,
    leading: 50,
    weight: 900
};

window.onkeydown = function (e) {
    if (e.which == 8) {
        const text = main_text.splice(-1, 1);
        main_group.remove(text);
        return;
    }
    if (e.which == 13) {
        for (let text of main_text) {

            text.translation.x += main_group.translation.x;
            text.translation.y += main_group.translation.y;

            text.velocity = new Two.Vector();
            text.velocity.x = 10 * (Math.random() - 0.5);
            text.velocity.y = - (20 * Math.random() + 13);
            text.velocity.r = Math.random() * Math.PI / 8;

            chars.push(text);
            two.add(text);
        }
        main_text.length = 0;
        return;
    }
    var character = String.fromCharCode(e.which);

    console.log(character, e.which);


    var text = two.makeText(character, 10, 10, styles);
    text.size *= 2;
    text.fill = '#999';
    text.alignment = 'left';

    main_text.push(text);
    main_group.add(text);


    // var x = Math.random() * two.width / 2 + two.width / 4;
    // var y = two.height * 1.25;

    // var text = two.makeText(character, x, y, styles);
    // text.size *= 2;
    // text.fill = '#999';

    // text.velocity = new Two.Vector();
    // text.velocity.x = 10 * (Math.random() - 0.5);
    // text.velocity.y = - (20 * Math.random() + 13);
    // text.velocity.r = Math.random() * Math.PI / 8;

    // chars.push(text);

    // character(character);
};


two.bind('update', () => {

    // let w = 0;
    for (let [i, text] of main_text.entries()) {
        text.translation.x = i * 80;

        // w += text.getBoundingClientRect().width
    }
    // console.log(w);


    if (main_group.children.length > 0) {
        // console.log(main_group.getBoundingClientRect());
        const bounds = main_group.getBoundingClientRect();
        main_group.translation.x = (two.width - bounds.width) * .5;
        main_group.translation.y = (two.height) * .5;

        main_rect.translation.copy( main_group.translation )

// console.log(bounds.height);
    }

    for (let [i, text] of chars.entries()) {
        // var text = chars[i];
        // console.log(text);
        text.translation.addSelf(text.velocity);
        text.rotation += text.velocity.r;

        text.velocity.addSelf(g);

        if (text.velocity.y > 0 && text.translation.y > two.height) {
            two.scene.remove(text);
            chars.splice(i, 1);
        }
    }
    // console.log('up');

});;