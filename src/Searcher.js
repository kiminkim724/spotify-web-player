import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap'

function Searcher(props) {
    const [searchInput, setSearchInput] = useState("")
    const [tracks, setTracks] = useState([])

    const access_token = props.token

    const searchTrack = async () => {
        if (searchInput) {
            const songLimit = 8;
            const tracks = await fetch("https://api.spotify.com/v1/search?q=" + searchInput + `&type=track&limit=${songLimit}`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${access_token}`
                },
            })
                .then(response => response.json())
                .then(data => data.tracks);

            console.log(tracks)
            setTracks(tracks.items);
        }
    }


    return (
        <>
            <Container>
                <InputGroup className="mt-3 mb-3" size="lg">
                    <FormControl
                        type="input"
                        placeholder="Search By Track Name ..."
                        value={searchInput}
                        onKeyPress={event => {
                            if (event.key == "Enter") {
                                searchTrack()
                            }
                        }}
                        onChange={event => { setSearchInput(event.target.value) }}
                    />
                    <Button onClick={searchTrack}>Search</Button>
                    <Button className="bg-danger"
                        onClick={() => {
                            setTracks([]);
                            setSearchInput("");
                        }}>
                        Clear
                    </Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className="mx-2 row row-cols-4">
                    {
                        tracks.map(track => (
                            <Card key={track.id} className="bg-secondary">
                                <Card.Img src={track.album.images[0].url} />
                                <Card.Body>
                                    <Card.Title className="text-dark">{track.name}</Card.Title>
                                    <Card.Subtitle className="text-white">{track.artists[0].name}</Card.Subtitle>
                                </Card.Body>
                                <Button className="mb-2" onClick={() => props.addSong(track.id)}>Add to queue</Button>
                            </Card>
                        ))
                    }

                </Row>
            </Container>

        </>
    )
}

export default Searcher