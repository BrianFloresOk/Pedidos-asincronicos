const qs = (element) => {
    return document.querySelector(element)
}

window.onload = () => {
    let inputTitle = qs("#title");
    let inputRating = qs("#rating");
    let inputLength = qs("#length");
    let inputAwards = qs("#awards");
    let releaseDate = qs("#release_date")
    let buttonEdit = qs("#buttonEdit");
    let buttonCreate = qs("#buttonCreate");
    let buttonDelete = qs("#buttonDelete");

    fetch("http://localhost:3031/api/movies/1")
        .then(response => response.json())
        .then(pelicula => {
            let data = pelicula.data
            inputTitle.value = data.title
            inputAwards.value = data.awards
            inputRating.value = data.rating
            inputLength.value = data.length
            releaseDate.value = data.release_date.slice(0, 10)
        })

    buttonCreate.addEventListener('mouseover', () => {
        buttonCreate.style.cursor = "pointer"
    })

    buttonCreate.addEventListener("click", (event) => {
        event.preventDefault()
        movieCreate()
    })
    
    buttonEdit.addEventListener('mouseover', () => {
        buttonEdit.style.cursor = "pointer"
    })

    buttonEdit.addEventListener("click", (event) => {
        event.preventDefault()
        movieEdit()
    })

    buttonDelete.addEventListener('mouseover', () => {
        buttonDelete.style.cursor = "pointer"
    })
    
    buttonDelete.addEventListener("click", (event) => {
        event.preventDefault()
        movieDelete()
    })

    const movieCreate = async () => {
        try {
            let req = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: inputTitle.value,
                    rating: inputRating.value,
                    awards: inputAwards.value,
                    release_date: releaseDate.value,
                    length: inputLength.value,
                    genre_id: 1
                })
            }
            let response = await fetch("http://localhost:3031/api/movies/create", req)
            let data = await response.json()
            if(data) {
                alert("Pelicula creada")
                window.reload()
            } else {
                alert("Ocurrio un error")
            }
        } catch (error) {
            alert(error)
        }
    }
    
    const movieEdit = async () => {
        try {
            let req = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: inputTitle.value,
                    rating: inputRating.value,
                    awards: inputAwards.value,
                    release_date: releaseDate.value,
                    length: inputLength.value,
                    genre_id: 1
                })
            }
            let response = await fetch("http://localhost:3031/api/movies/update/1", req)
            let data = await response.json()
            if(data) {
                alert("Pelicula editada")
                window.reload()
            } else {
                alert("Ocurrio un error")
            }
        } catch (error) {
            alert(error)
        }
    }

    const movieDelete = async () => {
        let method = {
            method: "DELETE"
        }
        try {
            let response = await fetch("http://localhost:3031/api/movies/delete/30", method)
            let data = await response.json()
            if(data) {
                alert("Pelicula eliminada")
            } else {
                alert("Ocurrio un error")
            }
        } catch (error) {
            alert(error)
        }
    }
}