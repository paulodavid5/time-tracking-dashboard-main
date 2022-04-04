const json_url = 'data.json';


async function getData() {
    const response = await fetch(json_url);
    const data = await response.json();

    console.log(data)

}

getData();

