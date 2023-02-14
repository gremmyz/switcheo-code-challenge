SELECT with_usd_amt.address
FROM (
    SELECT
        with_recent_trade.address,
        with_recent_trade.denom,
        CASE
            WHEN with_recent_trade.denom = 'usdc' THEN SUM(w_recent_t.amt) * 0.000001
            WHEN with_recent_trade.denom = 'swth' THEN SUM(has_recent_trades.amount) * 0.00000005
            WHEN with_recent_trade.denom = 'tmz' THEN SUM(has_recent_trades.amount) * 0.003
        END usd_amt
    FROM (
        SELECT
            balance.address,
            trade.denom,
            SUM(trade.amt) AS amt
        FROM trades
        INNER JOIN balance ON trade.address = balance.address
        WHERE trade.block_height > 730000
        GROUP BY balance.address, trade.denom
    ) with_recent_trade
    GROUP BY with_recent_trade.denom, with_recent_trade.address
) with_usd_amt
GROUP BY with_usd_amt.address
HAVING SUM(with_usd_amt.usd_amt) >= 500;
