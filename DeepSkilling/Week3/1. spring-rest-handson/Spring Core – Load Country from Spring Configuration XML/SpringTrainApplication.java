package com.cognizant.spring_train;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringTrainApplication {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(SpringTrainApplication.class);

    public static void main(String[] args) {

        LOGGER.info("START");

        displayCountry();

        LOGGER.info("END");
    }

    public static void displayCountry() {

        @SuppressWarnings("resource")
		ApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml");

        Country country =
                context.getBean("country", Country.class);

        LOGGER.info("Country : {}", country);
    }
}