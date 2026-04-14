package domain.exceptions.exceptionCharacterAlreadyExists;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ExceptionCharacterAlreadyExistsMapper implements ExceptionMapper<ExceptionCharacterAlreadyExists> {

    @Override
     public Response toResponse(ExceptionCharacterAlreadyExists exception) {
         return Response.status(Response.Status.CONFLICT.getStatusCode())
         .entity(exception.getError())
         .build();
     }
    
}
