package com.kli.kli_shop_pr.Products.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kli.kli_shop_pr.Customer.Model.Customer;
import com.kli.kli_shop_pr.Products.Exceptions.*;
import com.kli.kli_shop_pr.Products.Model.Product;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    private static final String apiURL = "https://fakestoreapi.com/products";
    private static final ObjectMapper mapper = new ObjectMapper();

    public static void main(String[] args) {
        try{
            List<Product> products= getProductsList();
            Customer customer = new Customer();
        }
        catch (Exception exception){
            System.out.println(exception.getMessage());
        } catch (ResponseException e) {
            throw new RuntimeException(e);
        }

    }
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() throws ResponseException, IOException, InterruptedException {
        ResponseEntity<List<Product>> allProduct = null;
        String responseBody = fetchDataFromApi();
        List<Product> productsList = mapJsonToProductClass(responseBody);
        allProduct = new ResponseEntity<>(productsList, HttpStatus.FOUND);
        return allProduct;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() throws CategoryNotFoundException, ResponseException, IOException, InterruptedException {
        ResponseEntity<List<String>> allCategoriesEntity = null;
        List<String> allCategories = getProductsList().stream()
                .map(Product::getCategory)
                .distinct()
                .collect(Collectors.toList());
        if (allCategories.isEmpty()) {
            throw new CategoryNotFoundException("Cannot load categories");
        } else {
            allCategoriesEntity = new ResponseEntity<>(allCategories, HttpStatus.FOUND);
        }
        return allCategoriesEntity;
    }

    @GetMapping("/pricesThresholds")
    public ResponseEntity<List<Double>> getPricesThresholds() throws ProductThresholdsNotFoundException, ResponseException, IOException, InterruptedException {
        ResponseEntity<List<Double>> pricesThresholdEntity = null;
        Double minProductThreshold = getProductsList()
                .stream()
                .mapToDouble(Product::getPrice)
                .min()
                .orElse(-1.0);
        Double maxProductThreshold = getProductsList()
                .stream()
                .mapToDouble(Product::getPrice)
                .max()
                .orElse(-1.0);
        if (minProductThreshold.equals(-1.0) || maxProductThreshold.equals(-1.0)) {
            throw new ProductThresholdsNotFoundException("Min and max threshols not found");
        }
        pricesThresholdEntity = new ResponseEntity<>(List.of(minProductThreshold, maxProductThreshold), HttpStatus.FOUND);
        return pricesThresholdEntity;
    }

    @GetMapping("/filter/prices/{thresholds}")
    public ResponseEntity<List<Product>> getPricesThresholds(@PathVariable List<Integer> thresholds) throws ProductPriceIsNotFoundBetweenThresholsException, ResponseException, IOException, InterruptedException {
        ResponseEntity<List<Product>> productsBetweenThresholdsEntity = null;
        List<Product> productsWithPriceBetweenThresholds = getProductsList().stream().filter(
                product -> product.getPrice() >= thresholds.get(0) && product.getPrice() <= thresholds.get(1)
        ).toList();

        if (productsWithPriceBetweenThresholds.isEmpty()) {
            throw new ProductPriceIsNotFoundBetweenThresholsException("There is not product between < " +
                    +thresholds.get(0) + ", " + thresholds.get(1) + "> threshold");
        }
        productsBetweenThresholdsEntity = new ResponseEntity<>(productsWithPriceBetweenThresholds, HttpStatus.FOUND);
        return productsBetweenThresholdsEntity;
    }

    @GetMapping("/get/{productId}")
    public Product getProductById(@PathVariable Long productId) throws IOException, InterruptedException, ResponseException {
        Product productByID = new Product();
        productByID = getProductsList().get(Math.toIntExact(productId));
        return productByID;
    }

    @GetMapping("/filter/category/{chosenCategory}")
    public List<Product> filterProductByItsCategory(@PathVariable String chosenCategory) throws CategoryNotFoundException, ResponseException, IOException, InterruptedException {
        List<Product> productsByCategory = new ArrayList<>();
        productsByCategory = getProductsList().stream().filter(
                product -> chosenCategory.equals(product.getCategory())
        ).toList();
        if (productsByCategory.isEmpty()) {
            throw new CategoryNotFoundException("Product with category" + chosenCategory + " not found :( ");
        }
        return productsByCategory;
    }

    @GetMapping("/filter/byPrices")
    public List<Product> filterProductByItsPrice(@RequestParam List<Double> chosenPrices) throws ProductWithChosenPriceNotFound, ResponseException, IOException, InterruptedException {
        List<Product> productsByPrices = new ArrayList<>();
        productsByPrices = getProductsList().stream().filter(
                product -> chosenPrices.get(0) >= product.getPrice() && chosenPrices.get(1) <= product.getPrice()
        ).toList();
        if (productsByPrices.isEmpty()) {
            throw new ProductWithChosenPriceNotFound("Product with prices between <"
                    + chosenPrices.get(0) + ", " + chosenPrices.get(1) + "> not found");
        }
        return productsByPrices;
    }

    public static String fetchDataFromApi() throws ResponseException, IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiURL))
                .build();

        HttpResponse<String> httpResponse = client.send(
                request, HttpResponse.BodyHandlers.ofString()
        );
        if (httpResponse.statusCode() == 200) {
            return httpResponse.body();
        } else {
            throw new ResponseException(httpResponse.statusCode() + " is different then 200");
        }
    }

    public static List<Product> mapJsonToProductClass(String jsonBody) throws IOException {
        Product[] allProducts = mapper.readValue(jsonBody, Product[].class);
        return Arrays.asList(allProducts);
    }

    public static List<Product> getProductsList() throws ResponseException, IOException, InterruptedException {
        return mapJsonToProductClass(
                fetchDataFromApi());
    }

}
