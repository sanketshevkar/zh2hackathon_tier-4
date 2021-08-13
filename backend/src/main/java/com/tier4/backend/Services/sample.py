def simulate(amounts, times, daily_credit):

    carry_money = 0
    to_be_removed = set()
    current_amounts = np.zeros(len(amounts)).astype(np.float64)
    payed_details = [0] * len(current_amounts)

    for day in range(int(max(times))):

        todays_money = daily_credit + carry_money
        carry_money = 0

        for i in range(len(amounts)):
            amount_left[i] = amounts[i] - current_amounts[i]
            time_left[i] = times[i] - day

        for i in range(len(amount_left)):

            if amount_left[i] == 0 and i not in to_be_removed:
                payed_details[i] = day
                to_be_removed.add(i)
            elif time_left[i] == 0 and i not in to_be_removed:
                to_be_removed.add(i)

        if len(to_be_removed) == len(amount_left):
            break


        weights = []
        for i in range(len(time_left)):

            if time_left[i] > 0:

                up = amount_left[i] * times[i] 
                a = time_left[i] ** 3
                b = amounts[i]
                down = a * b
                weights.append(up / down)
            else:
                weights.append(0)

        weights = np.array(weights)
        sum_weights = sum(weights)
        weights = weights / sum_weights

        for i in range(len(weights)):

            pot_money = todays_money * weights[i]
            req = amounts[i] - current_amounts[i]
            carry_money += max(0, pot_money - req)

            current_amounts[i] += min(req, pot_money)
    
    return payed_details