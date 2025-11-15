const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1080;

let showDebug = false;

let scaleFactor;
let kast;
let hitboxes;
let kleding;
let puzzel;
let puzzel2;
let puzzel3;
let puzzel4;
let puzzel_table = [];
let boek;
let knop;
let last_touch = null;
let not_allow_action = false;
let portrait_anim_pad = 400

// Laat hele scherm zien voor portret modus //
let amplitude;
let speed = 0.03; 
let t = 0;         
let portrait_running = false
//////////////////////////////////////////////

// User Status //
let kledingStukDragged = null;
let charDragged = null;
let puzzelDragged = null;
/////////////////

let drag_offset_x = 0;
let drag_offset_y = 0;

function checkForPortrait() {
    let aspect_ratio = windowWidth / windowHeight
    return aspect_ratio < 1.5
}

function setScaling() {
    scaleFactor = max(windowWidth/BASE_WIDTH, windowHeight/BASE_HEIGHT);
}

function getScaledMouse() {
  return {
    x: mouseX / scaleFactor, 
    y: mouseY / scaleFactor
  };
};

function getScaledTouches() {
    let s_touches = [];
    for (let touch of touches) {
        let s_touch = touch;
        s_touch.x = s_touch.x / scaleFactor;
        s_touch.y = s_touch.y / scaleFactor;
        s_touches.push(s_touch)
    }
    return s_touches
}

function tryMakeVisiblePuzzel(pzl) {
    for (let aPzl of puzzel_table) {
        if (aPzl.visible) {
            if (aPzl.completed) {
                aPzl.visible = false;
            } else {
                return;
            }
        }
    }
    pzl.visible = true;
}

function createHitBoxes() {
    hitboxes =  {
        hitbox_1: new Hitbox(726, 124, 160, 86, null, kast, true, (o) => o.setState("lade_1"), (o) => o.setState("lade_0"), () => downloadPDF("assets/downloads/Kleurplaat 1.pdf", "Tekening 1")),
        hitbox_2: new Hitbox(726, 216, 156, 86, null, kast, true, (o) => o.setState("lade_2"), (o) => o.setState("lade_0")),
        hitbox_3: new Hitbox(726, 308, 153, 86, null, kast, true, (o) => o.setState("lade_3"), (o) => o.setState("lade_0")),
        hitbox_4: new Hitbox(726, 400, 150, 86, null, kast, true, (o) => o.setState("lade_4"), (o) => o.setState("lade_0"), () => tryMakeVisiblePuzzel(puzzel4)),
        hitbox_5: new Hitbox(721, 510, 220, 64, null, kast, true, (o) => o.setState("lade_5"), (o) => o.setState("lade_0"), () => tryMakeVisiblePuzzel(puzzel3)),
        hitbox_6: new Hitbox(721, 580, 220, 64, null, kast, true, (o) => o.setState("lade_6"), (o) => o.setState("lade_0"), () => tryMakeVisiblePuzzel(puzzel)),
        hitbox_7: new Hitbox(945, 510, 220, 64, null, kast, true, (o) => o.setState("lade_7"), (o) => o.setState("lade_0"), () => tryMakeVisiblePuzzel(puzzel2)),
        hitbox_8: new Hitbox(945, 580, 220, 64, null, kast, true, (o) => o.setState("lade_8"), (o) => o.setState("lade_0"), () => setChaos(true)),
        hitbox_g: new Hitbox(888, 124, 280, 360, null, kast, true, (o) => o.setState("lade_g"), (o) => o.setState("lade_0")),
        hitbox_b: new Hitbox(1180, 460, 152, 242, null, boek, true, (o) => o.setOn(), (o) => o.setOff(), () => toggleBuyMenu()),
        hitbox_l: new Hitbox(530, 354, 80, 80, null, lamp, true, null, null, (o) => o.visible = !o.visible),
    };

    puzzel.boxes =  {
        box_1: new Hitbox(625, 696, 150, 100, {id: 1}, null, true),
        box_2: new Hitbox(873, 696, 150, 100, {id: 2}, null, true),
        box_3: new Hitbox(1115, 696, 150, 100, {id: 3}, null, true),
        box_4: new Hitbox(1385, 696, 150, 100, {id: 4}, null, true),
        box_5: new Hitbox(575, 816, 150, 100, {id: 5}, null, true),
        box_6: new Hitbox(843, 831, 150, 100, {id: 6}, null, true),
        box_7: new Hitbox(1135, 836, 150, 100, {id: 7}, null, true),
        box_8: new Hitbox(1425, 816, 150, 100, {id: 8}, null, true),
        box_9: new Hitbox(495, 950, 150, 100, {id: 9}, null, true),
        box_10: new Hitbox(825, 970, 150, 100, {id: 10}, null, true),
        box_11: new Hitbox(1150, 970, 150, 100, {id: 11}, null, true),
        box_12: new Hitbox(1465, 930, 150, 100, {id: 12}, null, true),
    };

    puzzel2.boxes =  {
        box_1: new Hitbox(625, 696, 150, 100, {id: 1}, null, true),
        box_2: new Hitbox(873, 696, 150, 100, {id: 2}, null, true),
        box_3: new Hitbox(1115, 696, 150, 100, {id: 3}, null, true),
        box_4: new Hitbox(1385, 696, 150, 100, {id: 4}, null, true),
        box_5: new Hitbox(575, 816, 150, 100, {id: 5}, null, true),
        box_6: new Hitbox(843, 831, 150, 100, {id: 6}, null, true),
        box_7: new Hitbox(1135, 836, 150, 100, {id: 7}, null, true),
        box_8: new Hitbox(1425, 816, 150, 100, {id: 8}, null, true),
        box_9: new Hitbox(495, 950, 150, 100, {id: 9}, null, true),
        box_10: new Hitbox(825, 970, 150, 100, {id: 10}, null, true),
        box_11: new Hitbox(1150, 970, 150, 100, {id: 11}, null, true),
        box_12: new Hitbox(1465, 930, 150, 100, {id: 12}, null, true),
    };

    puzzel3.boxes =  {
        box_1: new Hitbox(565, 696, 150, 100, {id: 1}, null, true),
        box_2: new Hitbox(809, 696, 150, 100, {id: 2}, null, true),
        box_3: new Hitbox(1225, 696, 150, 100, {id: 3}, null, true),
        box_4: new Hitbox(542, 820, 150, 100, {id: 4}, null, true),
        box_5: new Hitbox(805, 831, 150, 100, {id: 5}, null, true),
        box_6: new Hitbox(1083, 841, 150, 100, {id: 6}, null, true),
        box_7: new Hitbox(1288, 856, 150, 100, {id: 7}, null, true),
        box_8: new Hitbox(1459, 802, 150, 100, {id: 8}, null, true),
        box_9: new Hitbox(375, 950, 150, 100, {id: 9}, null, true),
        box_10: new Hitbox(675, 1010, 150, 100, {id: 10}, null, true),
        box_11: new Hitbox(1050, 1010, 150, 100, {id: 11}, null, true),
        box_12: new Hitbox(1465, 980, 150, 100, {id: 12}, null, true),
    };

    puzzel4.boxes =  {
        box_1: new Hitbox(575, 686, 150, 100, {id: 1}, null, true),
        box_2: new Hitbox(535, 816, 150, 100, {id: 2}, null, true),
        box_3: new Hitbox(480, 956, 150, 100, {id: 3}, null, true),
        box_4: new Hitbox(767, 738, 150, 100, {id: 4}, null, true),
        box_5: new Hitbox(767, 976, 150, 100, {id: 5}, null, true),
        box_6: new Hitbox(970, 668, 150, 100, {id: 6}, null, true),
        box_7: new Hitbox(990, 836, 150, 100, {id: 7}, null, true),
        box_8: new Hitbox(1010, 1026, 150, 100, {id: 8}, null, true),
        box_9: new Hitbox(1230, 728, 150, 100, {id: 9}, null, true),
        box_10: new Hitbox(1250, 950, 150, 100, {id: 10}, null, true),
        box_11: new Hitbox(1430, 686, 150, 100, {id: 11}, null, true),
        box_12: new Hitbox(1476, 836, 150, 100, {id: 12}, null, true),
        box_13: new Hitbox(1523, 978, 150, 100, {id: 13}, null, true),
    };

    knop.box = new Hitbox(knop.x-10, knop.y, knop.w+20, knop.h, null, null, false, null, null, () => setChaos(false))

};

function createKleding() {
    kleding = [];

    // BASIC
    kleding.push(new KledingStuk(860, 760, .46, 46, 201, "broek", v_broek_basic_img, v_broek_basic_vouw_img, "varkez", true, true, { x: 260, y: 244 }, null, {x: 210, y: 116}));
    kleding.push(new KledingStuk(960, 760, .46, 46, 117, "shirt", v_shirt_basic_img, v_shirt_basic_vouw_img, "varkez", true, true, { x: 260, y: 208 }, null, {x: 210, y: 151}));
    kleding.push(new KledingStuk(860, 760, .46, 53, 271, "broek", k_broek_basic_img, k_broek_basic_vouw_img, "kozijn", true, true, { x: 440, y: 244 }, null, {x: 125, y: 112}));
    kleding.push(new KledingStuk(960, 760, .46, 60, 217, "shirt", k_shirt_basic_img, k_shirt_basic_vouw_img, "kozijn", true, true, { x: 440, y: 208  }, null, {x: 120, y: 120}));

    // GEVANGENIS
    kleding.push(new KledingStuk(860, 760, .46, 53, 278, "broek", k_broek_gevangenis_img, k_broek_gevangenis_vouw_img, "kozijn", true, true, { x: 440, y: 122.1 }, null, {x: 125, y: 125}));
    kleding.push(new KledingStuk(860, 760, .46, 62, 196, "broek", v_broek_gevangenis_img, v_broek_gevangenis_vouw_img, "varkez", true, true, { x: 440, y: 156 }, null, {x: 173, y: 107}));
    kleding.push(new KledingStuk(960, 760, .46, 39, 219, "shirt", k_shirt_gevangenis_img, k_shirt_gevangenis_vouw_img, "kozijn", true, true, { x: 260, y: 154.1 }, null, {x: 126, y: 108}));   
    kleding.push(new KledingStuk(960, 760, .46, 46, 117, "shirt", v_shirt_gevangenis_img, v_shirt_gevangenis_vouw_img, "varkez", true, true, { x: 260, y: 120 }, null, {x: 200, y: 150}));

    // HOEDJES
    kleding.push(new KledingStuk(1060, 760, .46, 50, -60, "hoed", v_hoed_viking_img, v_hoed_viking_vouw_img, "varkez", true, true, { x: 354, y: 204 }, null, {x: 200, y: 215}));
    kleding.push(new KledingStuk(1060, 760, .46, 46, -75, "hoed", k_hoed_multi_img, k_hoed_multi_vouw_img, "kozijn", true, true, { x: 354, y: 304 }, null, {x: 145, y: 425}));

    // SET
    kleding.push(new KledingStuk(1060, 760, .46, 41, 218, "set", k_set_pak_img, k_set_pak_vouw_img, "kozijn", true, true, { x: 440, y: 344 }, null, {x: 155, y: 187}));
    kleding.push(new KledingStuk(1060, 760, .46, 26, 116, "set", v_set_cipier_img, v_set_cipier_vouw_img, "varkez", true, true, { x: 260, y: 344 }, null, {x: 250, y: 180}));

    kleding.push(new KledingStuk(1060, 760, .46, 50, -44, "hoed", v_hoed_cipier_img, v_hoed_cipier_vouw_img, "varkez", true, true, { x: 260, y: 300 }, null, {x: 200, y: 120}));

    // JURK
    kleding.push(new KledingStuk(1060, 760, .46, 55, 119, "set", v_shirt_jurk_img, v_shirt_jurk_vouw_img, "varkez", true, true, { x: 440, y: 434 }, null, {x: 200, y: 220}));
    kleding.push(new KledingStuk(1060, 760, .46, 34, 223, "set", k_shirt_jurk_img, k_shirt_jurk_vouw_img, "kozijn", true, true, { x: 260, y: 434 }, null, {x: 170, y: 230}));

    kleding.push(new KledingStuk(1060, 760, .46, 24, 219, "shirt", k_shirt_multi_img, k_shirt_multi_vouw_img, "kozijn", true, true, { x: 354, y: 344 }, null, {x: 170, y: 230}));
    kleding.push(new KledingStuk(1060, 760, .46, 37, 117, "shirt", v_shirt_multi_img, v_shirt_multi_vouw_img, "varkez", true, true, { x: 354, y: 248 }, null, {x: 170, y: 230}));


};

function createPuzzelStukken() {
    // PUZZEL 1
    puzzel.stukken.push(new PuzzelStuk(0, 0, pzl_1_img, .8, {x: 250, y: 75}, {x: 524, y: 676}, 1, true, true));             // EERSTE RIJ
    puzzel.stukken.push(new PuzzelStuk(328, 830, pzl_2_img, .8, {x: 180, y: 90}, {x: 796, y: 679}, 2, true, false));     
    puzzel.stukken.push(new PuzzelStuk(1980, 630, pzl_3_img, .8, {x: 170, y: 90}, {x: 1058, y: 672}, 3, true, false));
    puzzel.stukken.push(new PuzzelStuk(1980, 630, pzl_4_img, .8, {x: 200, y: 90}, {x: 1291, y: 672}, 4, true, false));
    puzzel.stukken.push(new PuzzelStuk(1000, 10, pzl_5_img, .8, {x: 300, y: 100}, {x: 433, y: 774}, 5, true, false));       // TWEEDE RIJ
    puzzel.stukken.push(new PuzzelStuk(1400, 1100, pzl_6_img, .8, {x: 260, y: 85}, {x: 708, y: 810}, 6, true, false));
    puzzel.stukken.push(new PuzzelStuk(1980, 630, pzl_7_img, .8, {x: 280, y: 120}, {x: 992, y: 780}, 7, true, false));
    puzzel.stukken.push(new PuzzelStuk(1000, 1180, pzl_8_img, .8, {x: 260, y: 160}, {x: 1280, y: 782}, 8, true, false));
    puzzel.stukken.push(new PuzzelStuk(1740, 1170, pzl_9_img, .8, {x: 380, y: 125}, {x: 316, y: 890}, 9, true, false));       // DERDE RIJ
    puzzel.stukken.push(new PuzzelStuk(1740, 1170, pzl_10_img, .8, {x: 260, y: 140}, {x: 689, y: 911}, 10, true, false));
    puzzel.stukken.push(new PuzzelStuk(300, 730, pzl_11_img, .8, {x: 225, y: 125}, {x: 1059, y: 935}, 11, true, false));
    puzzel.stukken.push(new PuzzelStuk(540, 1170, pzl_12_img, .8, {x: 230, y: 130}, {x: 1358, y: 886}, 12, true, false));
    
    // PUZZEL 2
    puzzel2.stukken.push(new PuzzelStuk(0, 0, pzl2_1_img, .8, {x: 180, y: 80}, {x: 524, y: 676}, 1, true, true));             // EERSTE RIJ
    puzzel2.stukken.push(new PuzzelStuk(328, 830, pzl2_2_img, .8, {x: 250, y: 85}, {x: 729, y: 677}, 2, true, false));     
    puzzel2.stukken.push(new PuzzelStuk(1980, 630, pzl2_3_img, .8, {x: 180, y: 110}, {x: 1058, y: 672}, 3, true, false));
    puzzel2.stukken.push(new PuzzelStuk(1980, 630, pzl2_4_img, .8, {x: 200, y: 100}, {x: 1291, y: 672}, 4, true, false));
    puzzel2.stukken.push(new PuzzelStuk(1000, 10, pzl2_5_img, .8, {x: 195, y: 135}, {x: 438, y: 783}, 5, true, false));       // TWEEDE RIJ
    puzzel2.stukken.push(new PuzzelStuk(1400, 1100, pzl2_6_img, .8, {x: 195, y: 115}, {x: 708, y: 795}, 6, true, false));
    puzzel2.stukken.push(new PuzzelStuk(1980, 630, pzl2_7_img, .8, {x: 260, y: 90}, {x: 1082, y: 813}, 7, true, false));
    puzzel2.stukken.push(new PuzzelStuk(1000, 1180, pzl2_8_img, .8, {x: 200, y: 115}, {x: 1372, y: 792}, 8, true, false));
    puzzel2.stukken.push(new PuzzelStuk(1740, 1170, pzl2_9_img, .8, {x: 270, y: 155}, {x: 317, y: 892}, 9, true, false));       // DERDE RIJ
    puzzel2.stukken.push(new PuzzelStuk(1740, 1170, pzl2_10_img, .8, {x: 260, y: 130}, {x: 689, y: 929}, 10, true, false));
    puzzel2.stukken.push(new PuzzelStuk(300, 730, pzl2_11_img, .8, {x: 235, y: 140}, {x: 1060, y: 939}, 11, true, false));
    puzzel2.stukken.push(new PuzzelStuk(540, 1170, pzl2_12_img, .8, {x: 250, y: 160}, {x: 1393, y: 901}, 12, true, false));

    // PUZZEL 3
    puzzel3.stukken.push(new PuzzelStuk(0, 0, pzl3_1_img, .8, {x: 125, y: 90}, {x: 524, y: 676}, 1, true, false));             // EERSTE RIJ
    puzzel3.stukken.push(new PuzzelStuk(328, 830, pzl3_2_img, .8, {x: 230, y: 80}, {x: 699, y: 677}, 2, true, false));     
    puzzel3.stukken.push(new PuzzelStuk(1980, 630, pzl3_3_img, .8, {x: 300, y: 75}, {x: 1058, y: 672}, 3, true, true));
    puzzel3.stukken.push(new PuzzelStuk(1980, 630, pzl3_4_img, .8, {x: 220, y: 150}, {x: 431, y: 764}, 4, true, false));
    puzzel3.stukken.push(new PuzzelStuk(1000, 10, pzl3_5_img, .8, {x: 200, y: 172}, {x: 750, y: 746}, 5, true, false));       // TWEEDE RIJ
    puzzel3.stukken.push(new PuzzelStuk(1400, 1100, pzl3_6_img, .8, {x: 180, y: 200}, {x: 1021, y: 747}, 6, true, true));
    puzzel3.stukken.push(new PuzzelStuk(1980, 630, pzl3_7_img, .8, {x: 150, y: 185}, {x: 1251, y: 767}, 7, true, false));
    puzzel3.stukken.push(new PuzzelStuk(1000, 1180, pzl3_8_img, .8, {x: 175, y: 135}, {x: 1408, y: 738}, 8, true, false));
    puzzel3.stukken.push(new PuzzelStuk(1740, 1170, pzl3_9_img, .8, {x: 175, y: 135}, {x: 313, y: 892}, 9, true, false));       // DERDE RIJ
    puzzel3.stukken.push(new PuzzelStuk(1740, 1170, pzl3_10_img, .8, {x: 275, y: 175}, {x: 534, y: 905}, 10, true, false));
    puzzel3.stukken.push(new PuzzelStuk(300, 730, pzl3_11_img, .8, {x: 260, y: 180}, {x: 906, y: 909}, 11, true, false));
    puzzel3.stukken.push(new PuzzelStuk(540, 1170, pzl3_12_img, .8, {x: 300, y: 130}, {x: 1296, y: 920}, 12, true, false));

    // PUZZEL 4
    puzzel4.stukken.push(new PuzzelStuk(0, 0, pzl4_1_img, .8, {x: 150, y: 75}, {x: 524, y: 676}, 1, true, false));             // EERSTE RIJ
    puzzel4.stukken.push(new PuzzelStuk(328, 830, pzl4_2_img, .8, {x: 220, y: 110}, {x: 419, y: 778}, 2, true, true));     
    puzzel4.stukken.push(new PuzzelStuk(1980, 630, pzl4_3_img, .8, {x: 280, y: 140}, {x: 308, y: 903}, 3, true, false));
    puzzel4.stukken.push(new PuzzelStuk(1980, 630, pzl4_4_img, .8, {x: 135, y: 160}, {x: 724, y: 679}, 4, true, false));
    puzzel4.stukken.push(new PuzzelStuk(600, 500, pzl4_5_img, .8, {x: 140, y: 160}, {x: 724, y: 901}, 5, true, false));       // TWEEDE RIJ
    puzzel4.stukken.push(new PuzzelStuk(1400, 1100, pzl4_6_img, .8, {x: 120, y: 50}, {x: 948, y: 673}, 6, true, false));
    puzzel4.stukken.push(new PuzzelStuk(1980, 630, pzl4_7_img, .8, {x: 150, y: 190}, {x: 942, y: 733}, 7, true, false));
    puzzel4.stukken.push(new PuzzelStuk(1000, 1180, pzl4_8_img, .8, {x: 185, y: 100}, {x: 939, y: 1004}, 8, true, false));
    puzzel4.stukken.push(new PuzzelStuk(1740, 1170, pzl4_9_img, .8, {x: 225, y: 125}, {x: 1124, y: 670}, 9, true, false));       // DERDE RIJ
    puzzel4.stukken.push(new PuzzelStuk(1740, 1170, pzl4_10_img, .8, {x: 185, y: 155}, {x: 1174, y: 882}, 10, true, true));
    puzzel4.stukken.push(new PuzzelStuk(300, 730, pzl4_11_img, .8, {x: 70, y: 70}, {x: 1448, y: 681}, 11, true, false));
    puzzel4.stukken.push(new PuzzelStuk(540, 1170, pzl4_12_img, .8, {x: 140, y: 150}, {x: 1438, y: 763}, 12, true, false));
    puzzel4.stukken.push(new PuzzelStuk(540, 1170, pzl4_13_img, .8, {x: 235, y: 100}, {x: 1428, y: 968}, 13, true, false));

};

function checkKleding() {
    for (let k of kleding) {
        if (k.spawn_kast) {
            let target_x = kast.x + k.kast_position_x;
            let target_y = kast.y + k.kast_position_y;
            k.x = target_x;
            k.y = target_y;
            k.state = "kast";
            k.visible = false;
        }
    }
}

function downloadPDF(pdfURL, name) {
  let a = document.createElement("a");
  a.href = pdfURL;
  a.download = name;  // suggested filename
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function toggleBuyMenu() {
    buy_menu.active = !buy_menu.active;
}

function setChaos(wants_chaos) {
    for (let pzl of puzzel_table) {
        if (pzl.visible && !pzl.completed) {
            return;
        }
    }
    if (wants_chaos) {
        wolken.visible = true
        sokken.visible = true;
        for (let name in hitboxes) {
            if (name === "hitbox_l") { continue }
             hitboxes[name].active = false;
        }
        knop.box.active = true;
        knop.visible = true;
        kast.setState("lade_0");
    } else {
        wolken.visible = true
        sokken.visible = false;
        knop.box.active = false;
        for (let name in hitboxes) {
            hitboxes[name].active = true;
        }
        knop.visible = false;
    }
}

function preload() {
    varkez_img = loadImage('assets/images/varkez.png')
    kozijn_img = loadImage('assets/images/kozijn.png')

    hut_img = loadImage('assets/images/huis/boomhut.png')
    sokken_img = loadImage('assets/images/huis/sokken.png')
    lamp_img = loadImage('assets/images/lamp/aan.png')
    
    kast_img_o_1 = loadImage('assets/images/kast/kastdeuren_o_1.png')
    kast_img_o_2 = loadImage('assets/images/kast/kastdeuren_o_2.png')
    kast_img_o_3 = loadImage('assets/images/kast/kastdeuren_o_3.png')
    kast_img_o_4 = loadImage('assets/images/kast/kastdeuren_o_4.png')
    kast_img_o_5 = loadImage('assets/images/kast/kastdeuren_o_5.png')
    kast_img_o_6 = loadImage('assets/images/kast/kastdeuren_o_6.png')
    kast_img_o_7 = loadImage('assets/images/kast/kastdeuren_o_7.png')
    kast_img_o_8 = loadImage('assets/images/kast/kastdeuren_o_8.png')
    kast_img_o_g = loadImage('assets/images/kast/kastdeuren_o_g.png')


    // PUZZEL 1
    pzl_1_img = loadImage('assets/images/puzzels/puzzel1/1.png')
    pzl_2_img = loadImage('assets/images/puzzels/puzzel1/2.png')
    pzl_3_img = loadImage('assets/images/puzzels/puzzel1/3.png')
    pzl_4_img = loadImage('assets/images/puzzels/puzzel1/4.png')
    pzl_5_img = loadImage('assets/images/puzzels/puzzel1/5.png')
    pzl_6_img = loadImage('assets/images/puzzels/puzzel1/6.png')
    pzl_7_img = loadImage('assets/images/puzzels/puzzel1/7.png')
    pzl_8_img = loadImage('assets/images/puzzels/puzzel1/8.png')
    pzl_9_img = loadImage('assets/images/puzzels/puzzel1/9.png')
    pzl_10_img = loadImage('assets/images/puzzels/puzzel1/10.png')
    pzl_11_img = loadImage('assets/images/puzzels/puzzel1/11.png')
    pzl_12_img = loadImage('assets/images/puzzels/puzzel1/12.png')

    // PUZZEL 2
    pzl2_1_img = loadImage('assets/images/puzzels/puzzel2/1.png')
    pzl2_2_img = loadImage('assets/images/puzzels/puzzel2/2.png')
    pzl2_3_img = loadImage('assets/images/puzzels/puzzel2/3.png')
    pzl2_4_img = loadImage('assets/images/puzzels/puzzel2/4.png')
    pzl2_5_img = loadImage('assets/images/puzzels/puzzel2/5.png')
    pzl2_6_img = loadImage('assets/images/puzzels/puzzel2/6.png')
    pzl2_7_img = loadImage('assets/images/puzzels/puzzel2/7.png')
    pzl2_8_img = loadImage('assets/images/puzzels/puzzel2/8.png')
    pzl2_9_img = loadImage('assets/images/puzzels/puzzel2/9.png')
    pzl2_10_img = loadImage('assets/images/puzzels/puzzel2/10.png')
    pzl2_11_img = loadImage('assets/images/puzzels/puzzel2/11.png')
    pzl2_12_img = loadImage('assets/images/puzzels/puzzel2/12.png')

    // PUZZEL 3
    pzl3_1_img = loadImage('assets/images/puzzels/puzzel3/1.png')
    pzl3_2_img = loadImage('assets/images/puzzels/puzzel3/2.png')
    pzl3_3_img = loadImage('assets/images/puzzels/puzzel3/3.png')
    pzl3_4_img = loadImage('assets/images/puzzels/puzzel3/4.png')
    pzl3_5_img = loadImage('assets/images/puzzels/puzzel3/5.png')
    pzl3_6_img = loadImage('assets/images/puzzels/puzzel3/6.png')
    pzl3_7_img = loadImage('assets/images/puzzels/puzzel3/7.png')
    pzl3_8_img = loadImage('assets/images/puzzels/puzzel3/8.png')
    pzl3_9_img = loadImage('assets/images/puzzels/puzzel3/9.png')
    pzl3_10_img = loadImage('assets/images/puzzels/puzzel3/10.png')
    pzl3_11_img = loadImage('assets/images/puzzels/puzzel3/11.png')
    pzl3_12_img = loadImage('assets/images/puzzels/puzzel3/12.png')

    // PUZZEL 4
    pzl4_1_img = loadImage('assets/images/puzzels/puzzel4/1.png')
    pzl4_2_img = loadImage('assets/images/puzzels/puzzel4/2.png')
    pzl4_3_img = loadImage('assets/images/puzzels/puzzel4/3.png')
    pzl4_4_img = loadImage('assets/images/puzzels/puzzel4/4.png')
    pzl4_5_img = loadImage('assets/images/puzzels/puzzel4/5.png')
    pzl4_6_img = loadImage('assets/images/puzzels/puzzel4/6.png')
    pzl4_7_img = loadImage('assets/images/puzzels/puzzel4/7.png')
    pzl4_8_img = loadImage('assets/images/puzzels/puzzel4/8.png')
    pzl4_9_img = loadImage('assets/images/puzzels/puzzel4/9.png')
    pzl4_10_img = loadImage('assets/images/puzzels/puzzel4/10.png')
    pzl4_11_img = loadImage('assets/images/puzzels/puzzel4/11.png')
    pzl4_12_img = loadImage('assets/images/puzzels/puzzel4/12.png')
    pzl4_13_img = loadImage('assets/images/puzzels/puzzel4/13.png')


    knop_a_img = loadImage('assets/images/knop/aan.png')
    knop_u_img = loadImage('assets/images/knop/uit.png')

    boek_img = loadImage('assets/images/boek/boek.png')

    v_broek_basic_img = loadImage('assets/images/kleding/dragen/v_broek_basic.png')
    v_shirt_basic_img = loadImage('assets/images/kleding/dragen/v_shirt_basic.png')
    v_hoed_viking_img = loadImage('assets/images/kleding/dragen/v_hoed_viking.png')
    k_broek_basic_img = loadImage('assets/images/kleding/dragen/k_broek_basic.png')
    k_shirt_basic_img = loadImage('assets/images/kleding/dragen/k_shirt_basic.png')
    k_hoed_multi_img = loadImage('assets/images/kleding/dragen/k_hoed_multi.png')
    k_shirt_multi_img = loadImage('assets/images/kleding/dragen/k_shirt_multi.png')
    v_shirt_multi_img = loadImage('assets/images/kleding/dragen/v_shirt_multi.png')

    k_shirt_jurk_img = loadImage('assets/images/kleding/dragen/k_shirt_jurk.png')
    v_shirt_jurk_img = loadImage('assets/images/kleding/dragen/v_shirt_jurk.png')

    k_broek_gevangenis_img = loadImage('assets/images/kleding/dragen/k_broek_gevangenis.png')
    k_shirt_gevangenis_img = loadImage('assets/images/kleding/dragen/k_shirt_gevangenis.png')
    v_broek_gevangenis_img = loadImage('assets/images/kleding/dragen/v_broek_gevangenis.png')
    v_shirt_gevangenis_img = loadImage('assets/images/kleding/dragen/v_shirt_gevangenis.png')

    k_set_pak_img = loadImage('assets/images/kleding/dragen/k_set_pak.png')
    v_set_cipier_img = loadImage('assets/images/kleding/dragen/v_set_cipier.png')

    v_hoed_cipier_img = loadImage('assets/images/kleding/dragen/v_hoed_cipier.png')
    
    // ---- GEVOUWEN KLEDING ----

    k_broek_basic_vouw_img = loadImage('assets/images/kleding/gevouwen/k_broek_basic_vouw.png')
    k_broek_gevangenis_vouw_img = loadImage('assets/images/kleding/gevouwen/k_broek_gevangenis_vouw.png')
    k_hoed_multi_vouw_img = loadImage('assets/images/kleding/gevouwen/k_hoed_multi_vouw.png')
    k_set_pak_vouw_img = loadImage('assets/images/kleding/gevouwen/k_set_pak_vouw.png')
    k_shirt_basic_vouw_img = loadImage('assets/images/kleding/gevouwen/k_shirt_basic_vouw.png')
    k_shirt_gevangenis_vouw_img = loadImage('assets/images/kleding/gevouwen/k_shirt_gevangenis_vouw.png')
    k_shirt_jurk_vouw_img = loadImage('assets/images/kleding/gevouwen/k_shirt_jurk_vouw.png')
    k_shirt_multi_vouw_img = loadImage('assets/images/kleding/gevouwen/k_shirt_multi_vouw.png')
    v_broek_basic_vouw_img = loadImage('assets/images/kleding/gevouwen/v_broek_basic_vouw.png')
    v_broek_gevangenis_vouw_img = loadImage('assets/images/kleding/gevouwen/v_broek_gevangenis_vouw.png')
    v_hoed_cipier_vouw_img = loadImage('assets/images/kleding/gevouwen/v_hoed_cipier_vouw.png')
    v_hoed_viking_vouw_img = loadImage('assets/images/kleding/gevouwen/v_hoed_viking_vouw.png')
    v_set_cipier_vouw_img = loadImage('assets/images/kleding/gevouwen/v_set_cipier_vouw.png')
    v_shirt_basic_vouw_img = loadImage('assets/images/kleding/gevouwen/v_shirt_basic_vouw.png')
    v_shirt_gevangenis_vouw_img = loadImage('assets/images/kleding/gevouwen/v_shirt_gevangenis_vouw.png')
    v_shirt_jurk_vouw_img = loadImage('assets/images/kleding/gevouwen/v_shirt_jurk_vouw.png')
    v_shirt_multi_vouw_img = loadImage('assets/images/kleding/gevouwen/v_shirt_multi_vouw.png')
    
    
    // --------------------------


    wolk_1_img = loadImage('assets/images/wolken/1.png')
    wolk_2_img= loadImage('assets/images/wolken/2.png')
}

function setup() {
    canvas = createCanvas(BASE_WIDTH, BASE_HEIGHT);
    //canvas.style("touch-action", "none");

    setScaling();
    resizeCanvas(BASE_WIDTH * scaleFactor, BASE_HEIGHT*scaleFactor)

    achtergrond = new Layer(hut_img, true)

    sokken = new Layer(sokken_img, false)

    lamp = new Layer(lamp_img, false, 150)
    
    chars = [];
    
    chars.push(new Character(200, 300, varkez_img, "varkez", .46))
    chars.push(new Character(1460, 200, kozijn_img, "kozijn", .46)) 

    kast = new Kast(634.5, 0, null, .5805)
    kast.states = {
        lade_0: null,
        lade_1: kast_img_o_1,
        lade_2: kast_img_o_2,
        lade_3: kast_img_o_3,
        lade_4: kast_img_o_4,
        lade_5: kast_img_o_5,
        lade_6: kast_img_o_6,
        lade_7: kast_img_o_7,
        lade_8: kast_img_o_8,
        lade_g: kast_img_o_g,
    }

    puzzel = new Puzzel(215, 216, {x: .7, y: .7}, false, 12, 1)
    puzzel2 = new Puzzel(215, 216, {x: .7, y: .7}, false, 12, 1)
    puzzel3 = new Puzzel(215, 216, {x: .7, y: .7}, false, 12, 2)
    puzzel4 = new Puzzel(215, 216, {x: .7, y: .7}, false, 13, 2)


    puzzel_table.push(puzzel)
    puzzel_table.push(puzzel2)
    puzzel_table.push(puzzel3)
    puzzel_table.push(puzzel4)

    boek = new Boek(1185, 462, boek_img, {x: .45, y: .45});

    buy_menu = new BuyMenu(1200, 300, 300, 200, "Bestel het boek door te mailen naar info@mariboer.nl");
    //opruim_text = new ColoredText(1041, 518, 143, 158, "Klik hier om op te ruimen", 20, (0,0,0), false)
    knop = new OpruimKnop(200, 220, knop_a_img, knop_u_img, {x: .5, y: .5}, false, 1, false)

    createKleding();

    checkKleding();

    createPuzzelStukken();
    createHitBoxes();

    puzzel.apply_transform();
    puzzel2.apply_transform();
    puzzel3.apply_transform();
    puzzel4.apply_transform();


    wolken = new AnimLayer([wolk_1_img, wolk_2_img], 120, 440, false, {x: .84, y: .84}, 20, 90, color(205, 255, 205, 205))

    //clouds = new Clouds(60, 15, 0, false)

    //createClouds();

    portrait_running = checkForPortrait()
}

function windowResized() {
    setScaling();
    resizeCanvas(BASE_WIDTH * scaleFactor, BASE_HEIGHT*scaleFactor)
}


function draw() {
    // Schalen per apparaat
    push();
    scale(scaleFactor);
    if (portrait_running) {
        speed = (windowWidth / windowHeight)/20
        amplitude = BASE_WIDTH - windowWidth / scaleFactor;
        let offset = (sin(t - Math.PI*.5) + 1) / 2 * amplitude;
        t += speed
        translate(-offset, 0);
        portrait_running = checkForPortrait()
        if (t >= (Math.PI*2)) { portrait_running = false}
    }

    not_allow_action = portrait_running
    //background(245,168,0);

    achtergrond.draw()

    lamp.draw()

    kast.draw();

    knop.checkBlink();

    knop.draw();

    puzzel.draw_stukken();
    puzzel2.draw_stukken();
    puzzel3.draw_stukken();
    puzzel4.draw_stukken();

    boek.draw();

    sokken.draw();

    chars.sort((a, b) => a.y - b.y);

    puzzel.stukken.sort((a, b) => (a.y + a.center_offset_y) - (b.y + b.center_offset_y));

    for (let c of chars) {
        c.draw()
    }

    kleding.sort((a, b) => a.y - b.y);

    const worn = kleding.filter(k => k.wearer != null).reverse(); // reverse order
    const notWorn = kleding.filter(k => k.wearer == null);

    const drawOrder = [...worn, ...notWorn];

    for (let k of drawOrder) {
        k.draw()
    }
   
    buy_menu.draw();

    wolken.draw()
    
    // === DEBUG === //
    if (showDebug) {
        if (puzzel.visible) {
            puzzel.draw_boxes()
        }
        if (puzzel2.visible) {
            puzzel2.draw_boxes()
        }
        if (puzzel3.visible) {
            puzzel3.draw_boxes()
        }
        if (puzzel4.visible) {
            puzzel4.draw_boxes()
        }

        for (let name in hitboxes) {
            hitboxes[name].draw()
        } 
    }
    // === ===== === //

    pop();
}

function checkInteract(p) {
    for (let i = kleding.length - 1; i >= 0; i--) {
        let k = kleding[i];
        if (!k.visible) { continue }
        if (k.isMouseOver(p.x, p.y)) {
            if (k.wearer) {
                k.wearer.clothes = k.wearer.clothes.filter(wk => wk !== k)
                print(k.wearer.clothes)
                k.wearer = null;
            }
            kledingStukDragged = k
            k.dragged = true;
            k.state = "drag"
            drag_offset_x = p.x - k.x;
            drag_offset_y = p.y - k.y;
            return;
        }
    }

    for (let i = chars.length - 1; i >= 0; i--) {
        let c = chars[i];
        if (c.isMouseOver(p.x, p.y)) {
            charDragged = c
            c.dragged = true;
            drag_offset_x = p.x - c.x;
            drag_offset_y = p.y - c.y;
            return;
        }
    }
    if (puzzel.visible) {
        for (let i = puzzel.stukken.length - 1; i >= 0; i--) {
            let ps = puzzel.stukken[i];
            if (ps.locked) { continue}
            if (ps.isMouseOver(p.x, p.y)) {
                if (ps.locked) { return }
                puzzelDragged = ps
                drag_offset_x = p.x - ps.x;
                drag_offset_y = p.y - ps.y;
                return;
            }

        }
    }
    if (puzzel2.visible) {
        for (let i = puzzel2.stukken.length - 1; i >= 0; i--) {
            let ps = puzzel2.stukken[i];
            if (ps.locked) { continue}
            if (ps.isMouseOver(p.x, p.y)) {
                if (ps.locked) { return }
                puzzelDragged = ps
                drag_offset_x = p.x - ps.x;
                drag_offset_y = p.y - ps.y;
                return;
            }

        }
    }

    if (puzzel3.visible) {
        for (let i = puzzel3.stukken.length - 1; i >= 0; i--) {
            let ps = puzzel3.stukken[i];
            if (ps.locked) { continue}
            if (ps.isMouseOver(p.x, p.y)) {
                if (ps.locked) { return }
                puzzelDragged = ps
                drag_offset_x = p.x - ps.x;
                drag_offset_y = p.y - ps.y;
                return;
            }

        }
    }

    if (puzzel4.visible) {
        for (let i = puzzel4.stukken.length - 1; i >= 0; i--) {
            let ps = puzzel4.stukken[i];
            if (ps.locked) { continue}
            if (ps.isMouseOver(p.x, p.y)) {
                if (ps.locked) { return }
                puzzelDragged = ps
                drag_offset_x = p.x - ps.x;
                drag_offset_y = p.y - ps.y;
                return;
            }

        }
    }

    for (let name in hitboxes) {
        if (hitboxes[name].isClicked(p.x, p.y)) {
            hitboxes[name].click();
            return
        }
    }
    if (knop.box.isClicked(p.x, p.y)) {
        knop.box.click()
    }
}

function checkIndirectInteract(p) {
    if (kledingStukDragged) {
        canvas.elt.style.touchAction = "none";
        kledingStukDragged.state = "drag";

        kledingStukDragged.x = p.x - drag_offset_x;
        kledingStukDragged.y = p.y - drag_offset_y;
        return true
    }
    if (charDragged) {
        canvas.elt.style.touchAction = "none";
        charDragged.x = p.x - drag_offset_x;
        charDragged.y = p.y - drag_offset_y;

        for (let i = charDragged.clothes.length - 1; i >= 0; i--) {
            let k = charDragged.clothes[i];
            k.x += drag_offset_x
            k.y += drag_offset_y

        }
        return true
    }
    if (puzzelDragged) {
        canvas.elt.style.touchAction = "none";
        puzzelDragged.x = p.x - drag_offset_x;
        puzzelDragged.y = p.y - drag_offset_y;
        return true
    }
    let hovered;
    for (let name in hitboxes) {
        if (hitboxes[name].isHovered(p.x, p.y)) {
            hovered = name
        } else {
            hitboxes[name].reset();
        }
    }
    if (hovered) {
        hitboxes[hovered].activate();  
        return true
    }
}

function checkRelease(p) {
     if (kledingStukDragged) {
        let found_target = false;
        let center = kledingStukDragged.getCenter()
        for (let i = chars.length - 1; i >= 0; i--) {
            let char = chars[i];
            if (char.name !== kledingStukDragged.target) { continue }
            if (char.isMouseOver(center.x, center.y)) {
                if (kledingStukDragged.type === "set") {
                    if (!char.clothes.some(wk => wk.type === "broek") && !char.clothes.some(wk => wk.type === "shirt")) {
                        char.clothes.push(kledingStukDragged)
                        kledingStukDragged.wearer = char
                        kledingStukDragged.dragged = false
                        kledingStukDragged.state = "wear"
                        found_target = true;
                    }
                } else {
                    if (!char.clothes.some(wk => wk.type === kledingStukDragged.type)) {
                        if (kledingStukDragged.type == "hoed") {
                            char.clothes.push(kledingStukDragged)
                            kledingStukDragged.wearer = char
                            kledingStukDragged.dragged = false
                            kledingStukDragged.state = "wear"
                            found_target = true;
                        } else {
                            if (!char.clothes.some(wk => wk.type === "set")) {
                                char.clothes.push(kledingStukDragged)
                                kledingStukDragged.wearer = char
                                kledingStukDragged.dragged = false
                                kledingStukDragged.state = "wear"
                                found_target = true;
                            } 
                        }
                    }
                }
            }
        }
        if (!found_target) {
            if (hitboxes["hitbox_g"].isHovered(p.x, p.y)) {
                //kast.contents.push(kledingStukDragged)
                kledingStukDragged.dragged = false;
                let target_x = kast.x + kledingStukDragged.kast_position_x;
                let target_y = kast.y + kledingStukDragged.kast_position_y;
                kledingStukDragged.x = target_x;
                kledingStukDragged.y = target_y;
                kledingStukDragged.state = "kast";
                found_target = true;
            }
        }

        if (!found_target) {
            kledingStukDragged.state = "idle"

            let clamp_extra = 60

            // CLAMPING
            if (kledingStukDragged.type == "hoed") {
                let aspect_ratio = kledingStukDragged.w/kledingStukDragged.h;
                kledingStukDragged.w = 80 * aspect_ratio;
                kledingStukDragged.h = 80;
            } else {
                kledingStukDragged.w = 80;
                kledingStukDragged.h = 80;
            }
            kledingStukDragged.x = constrain(kledingStukDragged.x, 0+clamp_extra, BASE_WIDTH - kledingStukDragged.w - clamp_extra)
            kledingStukDragged.y =  constrain(kledingStukDragged.y, 0+clamp_extra, BASE_HEIGHT - kledingStukDragged.h - clamp_extra)
            // END OF CLAMPING
        }
        kledingStukDragged = null;
    }

    if (puzzelDragged) {
        let c = puzzelDragged.getCenter()
        for (let pzl of puzzel_table) {
            if (!pzl.visible) { continue; }
            for (let name in pzl.boxes) {
                if (pzl.boxes[name].isHovered(c.x, c.y)) {
                    if (pzl.boxes[name].meta.id !== puzzelDragged.id) { continue }
                    puzzelDragged.lock()
                    pzl.pieces_put += 1
                    if (pzl.pieces_put >= pzl.pieces_needed) { pzl.completed = true}
                    break;
                }
            }
        }
        puzzelDragged = null;
    }
    if (charDragged) {
        charDragged = null;
    }
}

// MOBILE FUNCTIONALITY

function touchStarted() {
    if (not_allow_action) { return }
    let t0 = getScaledTouches()[0];
    if (t0) last_touch = t0;
    //start_touch = createVector(t0.x, t0.y);
    checkInteract(t0);
   
    succes = checkIndirectInteract(t0);

    if (succes) { return false }
}

/*
function touchMoved() {
    let t0 = getScaledTouches()[0];
    if (start_touch) {
        // move world by touch delta
        let dx = t0.x - start_touch.x;
        let dy = t0.y - start_touch.y;

        scroll_x += dx;
        scroll_y += dy;

        scroll_x = constrain(scroll_x, -(BASE_WIDTH - (windowWidth/scaleFactor)), 0);
        scroll_y = constrain(scroll_y, -(BASE_HEIGHT - (windowHeight/scaleFactor)), 0);

        start_touch.set(t0.x, t0.y);
    }
}
*/

function touchEnded() {
    if (not_allow_action) { return }
    //start_touch = null
    if (!last_touch) {
        if (kledingStukDragged) last_touch = { x: kledingStukDragged.x, y: kledingStukDragged.y };
        else if (puzzelDragged) last_touch = { x: puzzelDragged.x, y: puzzelDragged.y };
    }
    checkRelease(last_touch)
    canvas.style("touch-action", "auto");
    last_touch = null
}

// END OF MOBILE FUNCTIONALITY

function mousePressed() {
    if (not_allow_action) { return }
    if (mouseButton !== "left") { return }
    let m = getScaledMouse();

    checkInteract(m)

     print(kast.last_img_was_duplicate)
    if (kast.last_img_was_duplicate) { return }

}

function mouseDragged() {
    if (not_allow_action) { return }
    let m = getScaledMouse();
    let t0 = getScaledTouches()[0];
    if (t0) last_touch = t0;
    checkIndirectInteract(m);
}

function mouseReleased() {
    if (not_allow_action) { return }
    let m = getScaledMouse();
    checkRelease(m)
}

function mouseMoved() {
    if (not_allow_action) { return }
    let m = getScaledMouse();

    checkIndirectInteract(m);
}

class Layer {
    constructor(img, visible, transparency) {
        this.x = 0;
        this.y = 0;
        this.transparency = transparency;
        this.w = BASE_WIDTH;
        this.h = BASE_HEIGHT;
        this.img = img;
        this.visible = visible;
    }

    draw() {
        if (!this.visible) { return }
        if (this.transparency) {
            tint(255, this.transparency);
            image(this.img, this.x, this.y, this.w, this.h);
            noTint();
        } else {
            image(this.img, this.x, this.y, this.w, this.h);
        }
        
    }
}

class AnimLayer {
    constructor(images, x, y, visible, scaling, cycle_length, fade_out_length, color_tint) {
        this.x = x;
        this.y = y;
        this.scaling = scaling;
        this.default_transparency = alpha(color_tint);
        this.transparency = alpha(color_tint);
        this.cycle_length = cycle_length;
        this.timer = 0;
        this.cycle = 0;
        this.img = images[0];
        this.images = images;
        this.w = BASE_WIDTH * this.scaling.x;
        this.h = this.img.height * (this.w/this.img.width) * this.scaling.y;
        this.visible = visible;
        this.fade = 0
        this.color_tint = color_tint;
        this.max_fade = fade_out_length
    }

    draw() {
        if (!this.visible) { return }
        this.timer++
        this.fade++

        if (this.timer % this.cycle_length == 0) {
            this.cycle = (this.cycle + 1 )% this.images.length
            this.img = this.images[this.cycle]
        }

        if (this.fade >= this.max_fade) {
            this.visible = false
            this.fade = 0
            this.timer = 0
            return
        }
        this.transparency = (this.default_transparency*(1-(this.fade/this.max_fade)))

        tint(255, this.transparency);
        image(this.img, this.x, this.y, this.w, this.h);
        noTint();
    }
}

class BuyMenu {
    constructor(x, y, w, h, text, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.img = img;
        this.active = false;
    }

    draw() {
        if (!this.active) { return }
        if (this.img) {
            image(this.img, this.x, this.y, this.w, this.h)
        } else {
            strokeWeight(6)
            stroke(0)
            fill('white')
            ellipseMode(CORNER);
            ellipse(this.x, this.y, this.w, this.h)
        }
        fill('black')
        textSize(18)
        strokeWeight(0)
        textAlign(CENTER, CENTER);
        rectMode(CENTER)
        textWrap(WORD);
        text(this.text, this.x+this.w/2, this.y+this.h/2, this.w-20);

    }
}
class ColoredText {
    constructor(x, y, w, h, text, text_size = 20, color = (0,255,0), active = true) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text_size = text_size;
        this.color = color;
        this.text = text;
        this.active = active;
    }

    draw() {
        if (!this.active) { return }
        fill(this.color);
        textSize(this.text_size);
        strokeWeight(0)
        textAlign(CENTER, CENTER);
        rectMode(CENTER)
        textWrap(WORD);
        text(this.text, this.x+this.w/2, this.y+this.h/2, this.w);

    }
}


class Character {
    constructor(x, y, img, name, scale) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = img;
        this.clothes = [];
        this.dragged = false;
        this.w = img.width * scale;
        this.h = img.height * scale;
        this.dragged = false;
    }

    draw() {
        image(this.img, this.x, this.y, this.w, this.h);
    }

    isMouseOver(mx, my) {
        if (mx >= this.x && mx <= this.x + this.w &&
            my >= this.y && my <= this.y + this.h) {
            return true
        } else {
            return false
        }
    }
}


class Kast {
    constructor(x, y, img, scale) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.scale = scale;
        this.g_open = false;
        this.states = {};
        this.contents = [];
        this.last_img_was_duplicate = false;
    }

    draw() {
        if (!this.img) { return }
        image(this.img, this.x, this.y, this.img.width*this.scale, this.img.height*this.scale)
    }

    setState(state) {
        if (state == "lade_g") {
            this.g_open = true;
            for (let k of kleding) {
               if (k.state == "kast") {
                k.visible = true
               }
            }
        } else {
            this.g_open = false;
            for (let k of kleding) {
               if (k.state == "kast") {
                k.visible = false
               }
            }
        }
        this.img = this.states[state]
    }
}

class KledingStuk {
    constructor(x = BASE_WIDTH/2, y = BASE_HEIGHT/2, scale = 1, offset_x = 0, offset_y = 0, type = "shirt", img = null, img_idle = null, target = null, visible = true, spawn_kast = false, kast_position = {x: 0, y: 0}, wearer = null, center_offset) {
        this.x = x;
        this.y = y;
        this.offset_x = offset_x;
        this.offset_y = offset_y;
        this.type = type;
        this.target = target;
        this.img = img;
        this.img_idle = img_idle;
        this.visible = visible;
        this.kast_position_x = kast_position.x;
        this.kast_position_y = kast_position.y;
        this.center_offset_x = center_offset.x * scale;
        this.center_offset_y = center_offset.y * scale;
        this.wearer = wearer;
        this.dragged = false;
        this.spawn_kast = spawn_kast;
        if (img) {
            this.w = img.width * scale; 
            this.h = img.height * scale;
        } else {
            this.w = 256;
            this.h = 256;
        };
        this.default_w = this.w;
        this.default_h = this.h;
        this.idle_w = 80;
        this.idle_h = 46;
        this.state = "idle";
    };

    getCenter() {
        let x = this.x + this.center_offset_x
        let y = this.y + this.center_offset_y
        return {x, y}
    }

    draw_idle() { // Draw de idle versie (op de grond)
        this.w = this.idle_w;
        this.h = this.idle_h;
        image(this.img_idle, this.x, this.y, this.w, this.h);

    }

    draw_kast() {
        this.w = this.idle_w;
        this.h = this.idle_h;
        image(this.img_idle, this.x, this.y, this.w, this.h);
    }

    draw_default() {
        this.w = this.default_w;
        this.h = this.default_h;

        if (this.img) {
            image(this.img, this.x, this.y, this.w, this.h)
        } else {
            rect(this.x, this.x, this.y, this.h)
        }
    }

    draw() {
        if (!this.visible) { return }

        if (this.wearer) {
            this.x = this.wearer.x + this.offset_x;
            this.y = this.wearer.y + this.offset_y;
        }

        if (this.state === "wear" || this.state === "drag") {
            this.draw_default();
        } else if (this.state === "idle") {
            this.draw_idle();
        } else if (this.state === "kast") {
            this.draw_kast();
        }
    }

    isMouseOver(mx, my) {
        if (mx >= this.x && mx <= this.x + this.w &&
            my >= this.y && my <= this.y + this.h) {
            return true
        } else {
            return false
        }
    }
}

class Boek {
        constructor(x, y, img, scaling) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.scaling = scaling;
        this.toggled = false;
    }

    draw() {
        if (this.toggled) {
            tint('grey')
        }
        image(this.img, this.x, this.y, this.img.width*this.scaling.x, this.img.height*this.scaling.y)
        noTint();
    }

    setOn() {
        this.toggled = true;
    }

    setOff() {
        this.toggled = false;
    }
}

class OpruimKnop {
    constructor(x, y, img_aan, img_uit, scaling, visible, speed, box_visible) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.img_aan = img_aan;
        this.img_uit = img_uit;
        this.w = img_aan.width * scaling.x
        this.h = img_aan.height * scaling.y;
        this.visible = visible
        this.blink = false;
        this.box = null;
        this.box_visible = box_visible;
    }

    draw() {
        if (this.visible) {
            if (this.blink) {
                image(this.img_aan, this.x, this.y, this.w, this.h)
            } else {
                image(this.img_uit, this.x, this.y, this.w, this.h)
            }
        }
        if (this.box_visible) {
           this.box.draw()
        }
    }

    checkBlink() {
        this.blink = floor(millis() / (this.speed*1000)) % 2 === 0;
    }
}

class Puzzel {
    constructor(x, y, scaling, visible, pieces_needed, pieces_put) {
        this.x = x;
        this.y = y;
        this.scaling = scaling;
        this.stukken = [];
        this.boxes = {};
        this.visible = visible;
        this.pieces_put = pieces_put;
        this.pieces_needed =  pieces_needed;
        this.completed = false
    }

    apply_transform() {
        for (let s of this.stukken) {
            s.lock_x = s.lock_x * this.scaling.x + this.x;
            s.lock_y = s.lock_y * this.scaling.y + this.y;
            s.center_offset_x *= this.scaling.x;
            s.center_offset_y *= this.scaling.y;
            s.x *= this.scaling.x;
            s.y *= this.scaling.y;
            s.w *= this.scaling.x;
            s.h *= this.scaling.y;
        }
        for (let name in this.boxes) {
            this.boxes[name].x = this.boxes[name].x * this.scaling.x + this.x;
            this.boxes[name].y = this.boxes[name].y * this.scaling.y + this.y;
            this.boxes[name].w *= this.scaling.x;
            this.boxes[name].h *= this.scaling.y;
            
        }
    }

    draw_stukken() {
        if (!this.visible) { return }
        for (let s of this.stukken) {
            s.draw()
        }
    }

    draw_boxes() {
        for (let name in this.boxes) {
            this.boxes[name].draw()
        }
    }
}

class PuzzelStuk {
    constructor(x, y, img, scale = 1, center_offset, lock_pos, id, visible, locked) {
        this.x = x;
        this.y = y;
        this.cx = 0;
        this.cy = 0;
        this.img = img;
        this.w = img.width * scale;
        this.h = img.height * scale
        this.center_offset_x = center_offset.x * scale;
        this.center_offset_y = center_offset.y * scale;
        this.locked = locked;
        this.id = id;
        //this.brightness = 105
        this.visible = visible;
        this.lock_x = lock_pos.x
        this.lock_y = lock_pos.y
        if (locked) {
            this.lock()
        }
    }

    draw() {
        if (!this.visible) { return }
        if (this.locked) {
            this.x = this.lock_x;
            this.y = this.lock_y;
            //this.brightness = 255
        }
        //tint(this.brightness);
        image(this.img, this.x, this.y, this.w, this.h);
        //noTint();
    }

    getCenter() {
        let x = this.x + this.center_offset_x
        let y = this.y + this.center_offset_y
        return {x, y}
    }

    lock() {
        this.locked = true;
    }

    isMouseOver(mx, my) {
        if (mx >= this.x && mx <= this.x + this.w &&
            my >= this.y && my <= this.y + this.h) {
            return true
        } else {
            return false
        }
    }

}

class Hitbox {
  constructor(x, y, w, h, metadata, target, active, hover_action, reset_action, click_action) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.active = active;
    this.target = target;
    this.hover_action = hover_action;
    this.reset_action = reset_action;
    this.click_action = click_action;
    this.meta = metadata;
  }

    draw() {
        noFill();

        if (this.active) {
            stroke(105,185,0);
        } else {
            stroke(255,0,0);
        }

        rect(this.x, this.y, this.w, this.h);
    };

    isHovered(mx, my) {
        if (!this.active) { return }
        if (mx >= this.x && mx <= this.x + this.w &&
            my >= this.y && my <= this.y + this.h) {
            return true
        } else {
            return false
        }
    }

    isClicked(mx, my) {
        if (!this.active) { return }
        if (!this.click_action) { return }
        if (mx >= this.x && mx <= this.x + this.w &&
            my >= this.y && my <= this.y + this.h) {
            return true
        } else {
            return false
        }
    }

    click() {
    if (!this.click_action) { return }
       this.click_action(this.target); 
    }

    activate() {
        if (!this.hover_action) { return }
        this.hover_action(this.target);
    }

    reset() {
        if (!this.reset_action) { return }
        this.reset_action(this.target);
    } 
}