/**Class to represent a course Module*/

class Module{
    #id;
    #title;
    #content;

/**
 * Constructor for Module
 * @param {number} id - Module ID (in this case, a single-digit number)
 * @param {string} title - Module Title
 * @param {array<string>} content - Module Content (in this case, Lorem ipsum)
 */
constructor(id, title, content){
    this.#id = id;
    this.#title = title;
    this.#content = content;
}

get id(){
    return this.#id;
}

get title(){
    return this.#title;
}

get content(){
    return this.#content
}

}//end class

export { Module };