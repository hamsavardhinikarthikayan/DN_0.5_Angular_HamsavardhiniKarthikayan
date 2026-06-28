package com.cts.junit;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class AAATest {

    private int num1;
    private int num2;
    private int result;
    @Before
    public void setUp() {
        System.out.println("Setup Method");
        num1 = 10;
        num2 = 20;
    }
    @Test
    public void testAddition() {

       
        result = num1 + num2;

        assertEquals(30, result);
    }
    @After
    public void tearDown() {
        System.out.println("Teardown Method");
    }
}