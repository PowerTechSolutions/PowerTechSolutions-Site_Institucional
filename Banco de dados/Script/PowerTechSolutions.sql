create database PowerTechSolutions;
use PowerTechSolutions;	
	
create table Empresa(
	idEmpresa int primary key auto_increment,
    cnpj char(14),
    email varchar(45),
    senha varchar(40),
    filial int,
    constraint filial foreign key (filial)
		references Empresa(idEmpresa)
);

create table Usuario(
	idUsuario int primary key auto_increment,
    email varchar (45),
    senha varchar(30),
    usuarioAdm int,
    fkEmpresa int,
    
    constraint usuarioAdm foreign key (usuarioAdm)
		references Usuario(idUsuario),
        
	constraint fkEmpresa foreign key(fkEmpresa)
		references Empresa(idEmpresa)
);

create table HelpDesk(
	idHd int primary key auto_increment,
    problema varchar(200),
    horario datetime,
    fkUsuario int,
    
    constraint fkUsuario foreign key (fkUsuario)
		references Usuario(idUsuario)
);

create table Maquina(
	idMaquina int primary key auto_increment,
    tipo varchar(30), 
    
    so varchar(45),
    constraint chk check (so in('Windows','Linux')));
    
create table Monitoramento(
	idMonitoramento int auto_increment,
    fkUser int,
    fkMaquina int,
    CPU int,
    ram decimal(2),
    disco int,
    usb int,
    dt datetime,
    
    constraint pkCompsota primary key(idMonitoramento, fkUser, fkMaquina),
    
    constraint chk check (usb in(0,1)),
    
    constraint fkUser foreign key(fkUser)
		references Usuario(idUsuario),
	
    constraint fkMaquina foreign key(fkMaquina)
		references Maquina(idMaquina)
);

create table Localidade(
	idLocal int primary key auto_increment,
    andar int,
    sala int,
    setor varchar(30)
);