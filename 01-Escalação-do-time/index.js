function addPlayer(){
    const position= document.getElementById("position").value //O "Value" serve para exibir o valor em texto inserido no input
    const name= document.getElementById("name").value
    const number=document.getElementById("number").value
    
    const confirmacao= confirm("Escalar "+ name + " como " + position + " ?")

    if (confirmacao){
        const teamList = document.getElementById("teamList")
        const playerItem= document.createElement("li")
        playerItem.id = "player- " + number
        playerItem.innerText= position+ ": " + "Nome: " + name + " (" + number + ")"
        teamList.appendChild(playerItem)

        document.getElementById("position").value = ""
        document.getElementById("name").value =""
        document.getElementById("number").value=""
    }
}

function removePlayer(){
    const number = document.getElementById("numberToRemove").value
    const playerToRemove= document.getElementById("player- " + number)

    const confirmacao= confirm("Remover o jogador " + playerToRemove.innerText + " ?")

    if(confirmacao){
        document.getElementById("teamList").removeChild(playerToRemove)
        document.getElementById("numberToRemove").value= ""
    }
}