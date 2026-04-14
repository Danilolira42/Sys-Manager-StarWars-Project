package domain.exceptions.exceptionsNotFound;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ExceptionsNotFoundMapper implements ExceptionMapper<ExceptionNotFound>{

    @Override
    public Response toResponse(ExceptionNotFound exception) {
        return Response.status(Response.Status.NOT_FOUND.getStatusCode())
                .entity(exception.getError())
                .build();
    }
}
