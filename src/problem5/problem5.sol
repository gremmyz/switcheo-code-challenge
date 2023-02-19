// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract TokenBalanceChecker {
    function getBalances(address wallet, address[] calldata tokens) external view returns (TokenBalance[] memory) {
        TokenBalance[] memory balances = new TokenBalance[](tokens.length);
        for (uint i = 0; i < tokens.length; i++) {
            ERC20 token = ERC20(tokens[i]);
            balances[i] = TokenBalance({
                token: tokens[i],
                balance: token.balanceOf(wallet)
            });
        }
        return balances;
    }

    struct TokenBalance {
        address token;
        uint256 balance;
    }
}
