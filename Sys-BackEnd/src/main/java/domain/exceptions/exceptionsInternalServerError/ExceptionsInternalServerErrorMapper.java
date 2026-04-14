package domain.exceptions.exceptionsInternalServerError;

import jakarta.ws.rs.InternalServerErrorException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ExceptionsInternalServerErrorMapper implements ExceptionMapper<InternalServerErrorException> {

    @Override
    public Response toResponse(InternalServerErrorException exception) {
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode())
        .entity("An internal server error occurred. Please, try again later or contact the administrator for more information.")
        .build();
    }

}
