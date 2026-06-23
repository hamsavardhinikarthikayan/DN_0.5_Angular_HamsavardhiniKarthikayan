public class SearchTest {

    public static Product linearSearch(Product[] products, int id) {

        for (int i = 0; i < products.length; i++) {

            if (products[i].productId == id) {
                return products[i];
            }
        }
        return null;
    }

    public static Product binarySearch(Product[] products, int id) {
        int low = 0;
        int high = products.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (products[mid].productId == id) {
                return products[mid];
            }
            else if (id < products[mid].productId) {
                high = mid - 1;
            }
            else {
                low = mid + 1;
            }
        }
        return null;
    }
    public static void main(String[] args) {

        Product[] products = {
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Mouse", "Accessories"),
                new Product(103, "Keyboard", "Accessories"),
                new Product(104, "Phone", "Electronics"),
                new Product(105, "Watch", "Wearables"),
                new Product(106,"Desktop","Electronics"),
                new Product(107,"Earphones","Wearables")};

        int searchId = 106;
        
        //Linear search
        System.out.println("Linear Search");
        Product result1 = linearSearch(products, searchId);
        if (result1 != null)
            result1.display();
        else
            System.out.println("Product Not Found");

        System.out.println();
        
        //Binary search

        System.out.println("Binary Search");
        Product result2 = binarySearch(products, searchId);
        if (result2 != null)
            result2.display();
        else
            System.out.println("Product Not Found");

    }
}