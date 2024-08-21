import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = 'mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/RQ_Analytics?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define a route to fetch data from the shopifyCustomers collection
app.get('/shopifyCustomers', async (req, res) => {
  try {
    const customers = await mongoose.connection.db.collection('shopifyCustomers').find({}).toArray();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).send('Server error');
  }
});

// Define a route to fetch data from the shopifyOrders collection
app.get('/shopifyOrders', async (req, res) => {
  try {
    const orders = await mongoose.connection.db.collection('shopifyOrders').find({}).toArray();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Server error');
  }
});

// Define a route to fetch data from the shopifyProducts collection
app.get('/shopifyProducts', async (req, res) => {
    try {
      const products = await mongoose.connection.db.collection('shopifyProducts').find({}).toArray();
      res.json(products);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).send('Server error');
    }
  });

  //Total Sales Over Time on daily 
  app.get('/salesByDay', async (req, res) => {
    try {
      const pipeline = [
        {
          $addFields: {
            created_at: { $dateFromString: { dateString: "$created_at" } },
            total_price: { $toDecimal: "$total_price" }
          }
        },
        {
          $project: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
            total_price: 1
          }
        },
        {
          $group: {
            _id: "$date", // Group by date
            totalSales: { $sum: "$total_price" } // Sum up total_price for each date
          }
        },
        { $sort: { _id: 1 } } // Sort by date in ascending order
      ];
  
      const salesData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
  
      res.json(salesData); // Return the aggregated sales data for each day
    } catch (error) {
      console.error('Error fetching sales data by day:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  app.get('/salesByMonth', async (req, res) => {
    try {
      const pipeline = [
        {
          $addFields: {
            created_at: { $dateFromString: { dateString: "$created_at" } },
            total_price: { $toDecimal: "$total_price" }
          }
        },
        {
          $project: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
            total_price: 1
          }
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            totalSales: { $sum: "$total_price" }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } } 
      ];
      const salesData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
      res.json(salesData);
    } catch (error) {
      console.error('Error fetching monthly sales:', error);
      res.status(500).send('Server error');
    }
  });

  app.get('/salesByQuarter', async (req, res) => {
    try {
      const pipeline = [
        {
          $addFields: {
            created_at: { $dateFromString: { dateString: "$created_at" } },
            total_price: { $toDecimal: "$total_price" }
          }
        },
        {
          $project: {
            year: { $year: "$created_at" },
            quarter: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } },
            total_price: 1
          }
        },
        {
          $group: {
            _id: { year: "$year", quarter: "$quarter" },
            totalSales: { $sum: "$total_price" }
          }
        },
        { $sort: { "_id.year": 1, "_id.quarter": 1 } } 
      ];
      const salesData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
      res.json(salesData);
    } catch (error) {
      console.error('Error fetching quarterly sales:', error);
      res.status(500).send('Server error');
    }
  });

  
  app.get('/salesByYear', async (req, res) => {
    try {
      const pipeline = [
        {
          $addFields: {
            created_at: { $dateFromString: { dateString: "$created_at" } },
            total_price: { $toDecimal: "$total_price" }
          }
        },
        {
          $project: {
            year: { $year: "$created_at" },
            total_price: 1
          }
        },
        {
          $group: {
            _id: "$year",
            totalSales: { $sum: "$total_price" }
          }
        },
        { $sort: { _id: 1 } } 
      ];
      const salesData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
      res.json(salesData);
    } catch (error) {
      console.error('Error fetching yearly sales:', error);
      res.status(500).send('Server error');
    }
  });

  //Sales Growth Rate Over Time
  app.get('/dailySalesGrowthRate', async (req, res) => {
    try {
        const pipeline = [
            {
                $addFields: {
                    created_at: { $dateFromString: { dateString: "$created_at" } },
                    total_price: { $toDecimal: "$total_price" }
                }
            },
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } },
                    total_price: 1
                }
            },
            {
                $group: {
                    _id: "$date",
                    totalSales: { $sum: "$total_price" }
                }
            },
            { $sort: { _id: 1 } }, 
            {
                $setWindowFields: {
                    sortBy: { _id: 1 },
                    output: {
                        prevTotalSales: {
                            $shift: {
                                output: "$totalSales",
                                by: -1,
                                default: null
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    date: "$_id",
                    totalSales: 1,
                    growthRate: {
                        $cond: {
                            if: { $ne: ["$prevTotalSales", null] },
                            then: {
                                $multiply: [
                                    {
                                        $divide: [
                                            { $subtract: ["$totalSales", "$prevTotalSales"] },
                                            "$prevTotalSales"
                                        ]
                                    },
                                    100
                                ]
                            },
                            else: 0
                        }
                    }
                }
            }
        ];

        const growthData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
        res.json(growthData);
    } catch (error) {
        console.error('Error fetching daily sales growth rate:', error);
        res.status(500).send('Server error');
    }
});

app.get('/monthlySalesGrowthRate', async (req, res) => {
  try {
      const pipeline = [
          {
              $addFields: {
                  created_at: { $dateFromString: { dateString: "$created_at" } },
                  total_price: { $toDecimal: "$total_price" }
              }
          },
          {
              $project: {
                  year: { $year: "$created_at" },
                  month: { $month: "$created_at" },
                  total_price: 1
              }
          },
          {
              $group: {
                  _id: { year: "$year", month: "$month" },
                  totalSales: { $sum: "$total_price" }
              }
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } }, 
          {
              $setWindowFields: {
                  sortBy: { "_id.year": 1, "_id.month": 1 },
                  output: {
                      prevTotalSales: {
                          $shift: {
                              output: "$totalSales",
                              by: -1,
                              default: null
                          }
                      }
                  }
              }
          },
          {
              $project: {
                  year: "$_id.year",
                  month: "$_id.month",
                  totalSales: 1,
                  prevTotalSales: {
                      $ifNull: ["$prevTotalSales", 0] // Replace null with 0 for previous total sales
                  },
                  growthRate: {
                      $cond: {
                          if: { $ne: ["$prevTotalSales", 0] }, // Check against 0 instead of null
                          then: {
                              $multiply: [
                                  {
                                      $divide: [
                                          { $subtract: ["$totalSales", "$prevTotalSales"] },
                                          "$prevTotalSales"
                                      ]
                                  },
                                  100
                              ]
                          },
                          else: 0 // Set growthRate to 0 if prevTotalSales is 0
                      }
                  }
              }
          },
          {
              $project: {
                  year: 1,
                  month: 1,
                  totalSales: 1,
                  growthRate: {
                      $ifNull: ["$growthRate", 0] // Ensure growthRate is 0 if null
                  }
              }
          }
      ];

      const growthData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
      res.json(growthData);
  } catch (error) {
      console.error('Error fetching monthly sales growth rate:', error);
      res.status(500).send('Server error');
  }
});


app.get('/quarterlySalesGrowthRate', async (req, res) => {
  try {
      const pipeline = [
          {
              $addFields: {
                  created_at: { $dateFromString: { dateString: "$created_at" } },
                  total_price: { $toDecimal: "$total_price" }
              }
          },
          {
              $project: {
                  year: { $year: "$created_at" },
                  quarter: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } },
                  total_price: 1
              }
          },
          {
              $group: {
                  _id: { year: "$year", quarter: "$quarter" },
                  totalSales: { $sum: "$total_price" }
              }
          },
          { $sort: { "_id.year": 1, "_id.quarter": 1 } }, // Sort by year and quarter
          {
              $setWindowFields: {
                  sortBy: { "_id.year": 1, "_id.quarter": 1 },
                  output: {
                      prevTotalSales: {
                          $shift: {
                              output: "$totalSales",
                              by: -1,
                              default: null
                          }
                      }
                  }
              }
          },
          {
              $project: {
                  year: "$_id.year",
                  quarter: "$_id.quarter",
                  totalSales: 1,
                  prevTotalSales: {
                      $ifNull: ["$prevTotalSales", 0] // Replace null with 0 for previous total sales
                  },
                  growthRate: {
                      $cond: {
                          if: { $ne: ["$prevTotalSales", 0] }, // Check against 0 instead of null
                          then: {
                              $multiply: [
                                  {
                                      $divide: [
                                          { $subtract: ["$totalSales", "$prevTotalSales"] },
                                          "$prevTotalSales"
                                      ]
                                  },
                                  100
                              ]
                          },
                          else: 0 // Set growthRate to 0 if prevTotalSales is 0
                      }
                  }
              }
          },
          {
              $project: {
                  year: 1,
                  quarter: 1,
                  totalSales: 1,
                  growthRate: {
                      $ifNull: ["$growthRate", 0] // Ensure growthRate is 0 if null
                  }
              }
          }
      ];

      const growthData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
      res.json(growthData);
  } catch (error) {
      console.error('Error fetching quarterly sales growth rate:', error);
      res.status(500).send('Server error');
  }
});

  
app.get('/yearlySalesGrowthRate', async (req, res) => {
  try {
    const pipeline = [
      {
        $addFields: {
          created_at: { $dateFromString: { dateString: "$created_at" } },
          total_price: { $toDecimal: "$total_price" }
        }
      },
      {
        $project: {
          year: { $year: "$created_at" },
          total_price: 1
        }
      },
      {
        $group: {
          _id: "$year",
          totalSales: { $sum: "$total_price" }
        }
      },
      { $sort: { _id: 1 } }, // Sort by year
      {
        $setWindowFields: {
          sortBy: { _id: 1 },
          output: {
            prevTotalSales: {
              $shift: {
                output: "$totalSales",
                by: -1,
                default: null
              }
            }
          }
        }
      },
      {
        $project: {
          year: "$_id",
          totalSales: 1,
          growthRate: {
            $cond: {
              if: { $ne: ["$prevTotalSales", null] },
              then: {
                $multiply: [
                  {
                    $divide: [
                      { $subtract: ["$totalSales", "$prevTotalSales"] },
                      "$prevTotalSales"
                    ]
                  },
                  100
                ]
              },
              else: 0 // Set growthRate to 0 if previous sales data is null
            }
          }
        }
      },
      {
        $project: {
          year: 1,
          totalSales: 1,
          growthRate: { $ifNull: ["$growthRate", 0] } // Replace null growthRate with 0
        }
      }
    ];

    const growthData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
    res.json(growthData);
  } catch (error) {
    console.error('Error fetching yearly sales growth rate:', error);
    res.status(500).send('Server error');
  }
});

// New Customers Added Over Time - Daily
  app.get('/newCustomerByDaily', async (req, res) => {
    try {
      const pipeline = [
        {
          $addFields: {
            created_at: { $dateFromString: { dateString: "$created_at" } }
          }
        },
        {
          $project: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } }
          }
        },
        {
          $group: {
            _id: "$date",
            newCustomers: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ];
      const customersData = await mongoose.connection.db.collection('shopifyCustomers').aggregate(pipeline).toArray();
      
      res.json(customersData);
    } catch (error) {
      console.error('Error fetching daily new customers:', error);
      res.status(500).send('Server error');
    }
  });
  

  app.get('/newCustomersByMonth', async (req, res) => {
    try {
      const pipeline = [
        {
          $addFields: {
            created_at: { $dateFromString: { dateString: "$created_at" } }
          }
        },
        {
          $project: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" }
          }
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            newCustomers: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } }
      ];
      const customersData = await mongoose.connection.db.collection('shopifyCustomers').aggregate(pipeline).toArray();
      
      res.json(customersData);
    } catch (error) {
      console.error('Error fetching monthly new customers:', error);
      res.status(500).send('Server error');
    }
  });
  
  app.get('/newCustomersByQuarter', async (req, res) => {
    try {
      const pipeline = [
        {
          $addFields: {
            created_at: { $dateFromString: { dateString: "$created_at" } }
          }
        },
        {
          $project: {
            year: { $year: "$created_at" },
            quarter: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } }
          }
        },
        {
          $group: {
            _id: { year: "$year", quarter: "$quarter" },
            newCustomers: { $sum: 1 }
          }
        },
        { $sort: { "_id.year": 1, "_id.quarter": 1 } }
      ];
      const customersData = await mongoose.connection.db.collection('shopifyCustomers').aggregate(pipeline).toArray();
      
      res.json(customersData);
    } catch (error) {
      console.error('Error fetching quarterly new customers:', error);
      res.status(500).send('Server error');
    }
  });
  
  app.get('/newCustomersByYear', async (req, res) => {
    try {
      const pipeline = [
        {
          $addFields: {
            created_at: { $dateFromString: { dateString: "$created_at" } }
          }
        },
        {
          $project: {
            year: { $year: "$created_at" }
          }
        },
        {
          $group: {
            _id: "$year",
            newCustomers: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ];
      const customersData = await mongoose.connection.db.collection('shopifyCustomers').aggregate(pipeline).toArray();
      
      res.json(customersData);
    } catch (error) {
      console.error('Error fetching yearly new customers:', error);
      res.status(500).send('Server error');
    }
  });
  
//Number of Repeat Customers:
  app.get('/repeatCustomersDaily', async (req, res) => {
    try {
      const repeatCustomersDaily = await mongoose.connection.db.collection('shopifyOrders').aggregate([
        {
          $addFields: {
            createdAtDate: {
              $dateFromString: {
                dateString: "$created_at",
                onError: null, 
                onNull: null,  
              }
            },
          },
        },
        {
          $match: {
            createdAtDate: { $ne: null },
          },
        },
        {
          $addFields: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAtDate" } },
          },
        },
        {
          $group: {
            _id: { customer_id: "$customer.id", day: "$day" },
            orderCount: { $sum: 1 },
          },
        },
        {
          $match: {
            orderCount: { $gt: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.customer_id",
            repeatDaysCount: { $sum: 1 },
          },
        },
        {
          $addFields: {
            _id: { $toString: "$_id" }
          }
        },
        {
          $sort: { repeatDaysCount: -1 },
        },
      ]).toArray();
  
      res.json(repeatCustomersDaily);
    } catch (error) {
      console.error("Error fetching repeat customers:", error);
      res.status(500).json({ error: 'An error occurred while fetching repeat customers.' });
    }
  });
  app.get('/repeatCustomersByMonth', async (req, res) => {
  try {
    const pipeline = [
      {
        $addFields: {
          created_at: { $dateFromString: { dateString: "$created_at" } }
        }
      },
      {
        $project: {
          year: { $year: "$created_at" },
          month: { $month: "$created_at" },
          customer_id: "$customer.id" 
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month", customer_id: "$customer_id" },
          orderCount: { $sum: 1 }
        }
      },
      {
        $match: {
          orderCount: { $gt: 1 }
        }
      },
      {
        $group: {
          _id: { year: "$_id.year", month: "$_id.month" },
          repeatCustomers: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ];

    const repeatCustomersData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
    res.json(repeatCustomersData);
  } catch (error) {
    console.error('Error fetching monthly repeat customers:', error);
    res.status(500).send('Server error');
  }
});

app.get('/repeatCustomersByQuarter', async (req, res) => {
  try {
    const pipeline = [
      {
        $addFields: {
          created_at: { $dateFromString: { dateString: "$created_at" } }
        }
      },
      {
        $project: {
          year: { $year: "$created_at" },
          quarter: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } },
          customer_id: "$customer.id" 
        }
      },
      {
        $group: {
          _id: { year: "$year", quarter: "$quarter", customer_id: "$customer_id" },
          totalOrders: { $sum: 1 }
        }
      },
      {
        $match: {
          totalOrders: { $gt: 1 }
        }
      },
      {
        $group: {
          _id: { year: "$_id.year", quarter: "$_id.quarter" },
          repeatCustomers: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.quarter": 1 }
      }
    ];

    const repeatCustomersData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
    res.json(repeatCustomersData);
  } catch (error) {
    console.error('Error fetching quarterly repeat customers:', error);
    res.status(500).send('Server error');
  }
});

app.get('/repeatCustomersByYear', async (req, res) => {
  try {
    const pipeline = [
      {
        $addFields: {
          created_at: { $dateFromString: { dateString: "$created_at" } }
        }
      },
      {
        $project: {
          year: { $year: "$created_at" },
          customer_id: "$customer.id" 
        }
      },
      {
        $group: {
          _id: { year: "$year", customer_id: "$customer_id" },
          totalOrders: { $sum: 1 }
        }
      },
      {
        $match: {
          totalOrders: { $gt: 1 }
        }
      },
      {
        $group: { 
          _id: "$_id.year",
          repeatCustomers: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ];

    const repeatCustomersData = await mongoose.connection.db.collection('shopifyOrders').aggregate(pipeline).toArray();
    res.json(repeatCustomersData);
  } catch (error) {
    console.error('Error fetching yearly repeat customers:', error);
    res.status(500).send('Server error');
  }
});


app.get('/clvByCohort', async (req, res) => {
  try {
      const orders = mongoose.connection.db.collection('shopifyOrders');
      const customers = mongoose.connection.db.collection('shopifyCustomers');

      const clvData = await orders.aggregate([
          // Convert created_at to Date type
          {
              $addFields: {
                  created_at_date: { $dateFromString: { dateString: "$created_at" } }
              }
          },
          // Join with customers collection
          {
              $lookup: {
                  from: 'shopifyCustomers',
                  localField: 'customer.id',
                  foreignField: 'id',
                  as: 'customerInfo'
              }
          },
          { $unwind: '$customerInfo' },
          {
              $group: {
                  _id: "$customer.id",
                  firstPurchaseDate: { $min: "$created_at_date" },
                  totalCLV: { $sum: { $toDouble: "$total_price" } }
              }
          },
          {
              $addFields: {
                  cohort: { $dateToString: { format: "%Y-%m", date: "$firstPurchaseDate" } }
              }
          },
          {
              $group: {
                  _id: "$cohort",
                  averageCLV: { $avg: "$totalCLV" },
                  totalCLV: { $sum: "$totalCLV" },
                  customers: { $sum: 1 }
              }
          },
          {
              $sort: { _id: 1 }
          }
      ]).toArray();

      res.json(clvData);
  } catch (error) {
      console.error('Error fetching CLV data:', error);
      res.status(500).send('Server error');
  }
});

  app.get('/customerDistributionByCity', async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: "$default_address.city",
            customerCount: { $sum: 1 }
          }
        },
        {
          $project: {
            city: "$_id",
            customerCount: 1,
            _id: 0
          }
        },
        { $sort: { customerCount: -1 } }
      ];
      const distributionData = await mongoose.connection.db.collection('shopifyCustomers').aggregate(pipeline).toArray();
      res.json(distributionData);
    } catch (error) {
      console.error('Error fetching customer distribution by city:', error);
      res.status(500).send('Server error');
    }
  });
  const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
