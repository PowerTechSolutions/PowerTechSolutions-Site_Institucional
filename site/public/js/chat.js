var show_lit = false
function literate() {
    if (show_lit == true) {
        show_lit = false
        lit_dropdown.style.display = 'none'
    } else {
        show_lit = true
        lit_dropdown.style.display = 'block'
    }
}

function clickclose3() {
    if (show_lit == true) {
        show_lit = false
        lit_dropdown.style.display = 'none'
    }
}

var show_ram = false
function ram() {
    show_ram = true
    info_ram.style.display = 'block'
}

function close_ram() {
    if (show_ram == true) {
        show_ram = false
        info_ram.style.display = 'none'
    }
}

var show_disc = false
function disco() {
    show_disc = true
    info_disc.style.display = 'block'
}

function close_disc() {
    if (show_disc == true) {
        show_disc = false
        info_disc.style.display = 'none'
    }
}

var show_cpu = false
function cpu() {
    show_cpu = true
    info_cpu.style.display = 'block'
}

function close_cpu() {
    if (show_cpu == true) {
        show_cpu = false
        info_cpu.style.display = 'none'
    }
}

var show_cadastro = false
function cadastro() {
    show_cadastro = true
    container.style.display = 'block'
}

function fechar() {
    if (show_cadastro == true) {
        show_cadastro = false
        container.style.display = 'none'
    }
}
