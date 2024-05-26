import React, { useState, useEffect } from 'react';
import classes from './dashboard.module.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAll, getBookingCountByMonth } from '../../bookingService';

export default function Dashboard() {
  const [totalBookings, setTotalBookings] = useState(0);
  const [growthPercentage, setGrowthPercentage] = useState(0);

  useEffect(() => {
    // Function to fetch total bookings and calculate growth percentage
    const fetchBookingsData = async () => {
      try {
        const bookings = await getAll();
        setTotalBookings(bookings.length); // Set the total number of bookings

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

        const currentMonthCount = await getBookingCountByMonth(currentYear, currentMonth);
        const previousMonthCount = await getBookingCountByMonth(previousYear, previousMonth);

        const growth = previousMonthCount === 0 ? 100 : ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
        setGrowthPercentage(growth.toFixed(1)); // Set the growth percentage
      } catch (error) {
        console.error('Error fetching bookings data:', error);
      }
    };

    fetchBookingsData();
  }, []);

  return (
    <div>
      <div className={classes.heading}>
        <h2>Dashboard</h2>
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        <Card className="text-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {growthPercentage > 0 ? '+' : ''}{growthPercentage}% from last month
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
