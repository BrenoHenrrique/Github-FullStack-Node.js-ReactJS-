//esta classe é para colocar todos os métodos que se repetem

module.exports = function ParseStringAsArray(ArrayString) {

    //"split" ele separa o array por alguma palavra letra ou simbolo neste caso foi "," e retorna um array
    //"map" ele percorre o array e sempre que ele chegar em um dado ele executa um função, "tech" é alusão a tecnologias e a função "trim" remove os espaços
    return ArrayString.split(',').map(tech => tech.trim());
}