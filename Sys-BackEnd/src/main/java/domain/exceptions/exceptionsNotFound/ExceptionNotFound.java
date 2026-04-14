package domain.exceptions.exceptionsNotFound;

public class ExceptionNotFound extends RuntimeException {

    private String error;

    public ExceptionNotFound(String error) {
        this.error = error;
    }

    public String getError() {
        return error;
    }

}
