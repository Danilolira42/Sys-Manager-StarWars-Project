package Interfaces;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import modelsDTO.CharacterDTO;

@Path("/people")
@RegisterRestClient(configKey = "swapi")
public interface ExternalServiceInterface {

    @GET
    CharacterDTO getAllCharacters();
}