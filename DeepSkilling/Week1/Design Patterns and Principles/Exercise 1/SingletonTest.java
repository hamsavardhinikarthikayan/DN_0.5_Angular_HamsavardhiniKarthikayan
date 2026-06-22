public class SingletonTest {

    public static void main(String[] args) {

        Logger logger1 = Logger.getInstance();
        logger1.log("Application Started");

        Logger logger2 = Logger.getInstance();
        logger2.log("User Logged In");

        if (logger1 == logger2) {
            System.out.println("Both references point to the same Logger object.");
        } else {
            System.out.println("Different Logger objects.");
        }

        System.out.println("Logger1 HashCode : " + logger1.hashCode());
        System.out.println("Logger2 HashCode : " + logger2.hashCode());
    }

}