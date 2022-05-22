window.onload = function () {
    fetchUser();
}

let usersArr = [];

const fetchUser = () => {
    for (let i = 0; i < 5; i++) {
        fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then(data => {
                usersArr.push(data);
            })
            .then(data => {
                if (usersArr.length == 5) {
                    usersArr.sort((a, b) => a.results[0].name.last - b.results[0].name.last);
                    displayNamePhoto();
                }
            })
    }
}

const displayNamePhoto = () => {
    const contactsList = document.getElementById('contacts-list');
    let index = 0;
    usersArr.forEach(user => {
        index++;

        const li = document.createElement('li');
        li.id = index;

        const li1 = document.createElement('li');
        li1.id = "contact" + index;

        const img = document.createElement('img');
        img.name = index;
        img.id = index;

        const button = document.createElement('button');
        button.type = "button";
        button.name = index;
        button.id = index;
        button.setAttribute("onClick", "displayMoreInfo(this.id)");

        li.innerHTML = `${user.results[0].name.first} ${user.results[0].name.last}`;

        li1.innerHTML = `${user.results[0].location.street.number} ${user.results[0].location.street.name}, ${user.results[0].location.city}, ${user.results[0].location.state} ${user.results[0].location.postcode}`;
        li1.style.display = "none";

        img.src = `${user.results[0].picture.thumbnail}`;

        button.innerHTML = 'More Info';

        contactsList.append(li, img, button);
        li.append(li1);
    })
}

const displayMoreInfo = (id) => {
    const item = document.getElementById("contact" + id);
    if (item.style.display === "none") {
        item.style.display = "flex";
    } else {
        item.style.display = "none";
    }
}
