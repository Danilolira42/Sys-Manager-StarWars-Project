package domain.interfaces;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import domain.models.characters.CharactersDTO;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;

@Path("/people")
@RegisterRestClient(configKey = "swapi")
public interface ExternalServiceInterface {

    @GET
    CharactersDTO getAllCharacters();

    @GET
    CharactersDTO getCharacterByName(@QueryParam("search") String name);
}