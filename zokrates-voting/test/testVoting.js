const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
	it("should have no vote yet", async () => {
		return Voting.deployed().then(async (instance) => {
			let max = await instance.maximumOptions.call();
			assert.ok(max > 0);

			for(let i = 0; i < max; i++) 
				assert.equal(await instance.votes.call(i), 0);
		});
	});


	it("should vote", () => {
		let voting;

		return Voting.deployed().then(async (instance) => {
			voting = instance;

			return await instance.vote(
				1,
				["0x1cbbab30c3bcfea50231a6f17f25b4172baa26fc92dc04e97ec3e938710ae5c6", "0x6c10a4194ebfec915fe92cac9309b154049397555dcb3b81ea1bc37127e7b77"],
				["0x11570b3218b7e0fd8189214ecca08b71471ee8f7ca1ac3becec73f1411f62fd", "0x1acc4a61f3c63dbc57a43f979b8c91a2db43f8fe67df7cb2bf4497ad1a0df66b"],
				[["0x2d725df2466a40639ccde36a84d812dc7779706d387e43436a8204ba4f461dba", "0x24b3b806de7586b51d88c1e5c8dd92e1cd87cb103496412d32867f45be0552cd"], ["0x19984673a4d5134843e8df3203dbfb16da2398fb23b46516fc16a828c1050b52", "0x136dab75844ceaf53641feb39a013098f70883932c647e82c7de5f979e9eccf7"]],
				["0x1dd199ba14cb9413b2efb0a777bcfdec3a97f6def04d875606f5a6e04dbf8418", "0x2c3d6876e87b120827ab1f3aa91b9cad9922e0391e58b5d9a250798f260dc20"],
				["0x174b25732697c24b9e6e4552e976671c50ce4909f0197799dcaebefd7eed3985", "0x2dd4700c522b2fa2b20388ee3fbec891618d8443ead6bb010503aefb78260682"],
				["0xe8a97a69f3bd67c10907e58f862b6bca743378a4b7df1915575cc2d276577bb", "0x29fcccc1f8dccb6dcc2306b54b91258d5d4af21e251d3b8766dfa849d3cc6b5f"],
				["0x11fb0312c87f2a7415aadd546bc09d749aa85f36f3638941a78ecd0a8afcf1ef", "0xbab91ee10a41f3ae0912c6de12a6ffafb33a02205a49499589d0c2e91cc2aa6"],
				["0x1b3625ba1d5880d0536674cde69805ae12309cfbb107e6a614cf5493e5cf443b", "0x26c8d4a282bbf282ebf8644c474005034d861205571334c8df04cc82cb0f0ca5"],
				[20]
			);
		})
		.then((verfied) => {
			return assert.ok(verfied);
		})
		.then(async () => {
			let v = await voting.votes.call(1);
			return assert.equal(v.valueOf(), 1);
		});
	});

	it("should not vote", () => {
		let voting;

		return Voting.deployed().then(async (instance) => {
			voting = instance;

			try {
				await instance.vote(
					2,
					["0x1cb0000000000ea50231a6f17f25b4172baa26fc92dc04e97ec3e938710ae5c6", "0x6c10a4194ebfec915fe92cac9309b154049397555dcb3b81ea1bc37127e7b77"],
					["0x11500000000000fd8189214ecca08b71471ee8f7ca1ac3becec73f1411f62fd", "0x1acc4a61f3c63dbc57a43f979b8c91a2db43f8fe67df7cb2bf4497ad1a0df66b"],
					[["0x2d000000000040639ccde36a84d812dc7779706d387e43436a8204ba4f461dba", "0x24b3b806de7586b51d88c1e5c8dd92e1cd87cb103496412d32867f45be0552cd"], ["0x19984673a4d5134843e8df3203dbfb16da2398fb23b46516fc16a828c1050b52", "0x136dab75844ceaf53641feb39a013098f70883932c647e82c7de5f979e9eccf7"]],
					["0x1dd0000000000413b2efb0a777bcfdec3a97f6def04d875606f5a6e04dbf8418", "0x2c3d6876e87b120827ab1f3aa91b9cad9922e0391e58b5d9a250798f260dc20"],
					["0x174000000000024b9e6e4552e976671c50ce4909f0197799dcaebefd7eed3985", "0x2dd4700c522b2fa2b20388ee3fbec891618d8443ead6bb010503aefb78260682"],
					["0xe8a00000000007c10907e58f862b6bca743378a4b7df1915575cc2d276577bb", "0x29fcccc1f8dccb6dcc2306b54b91258d5d4af21e251d3b8766dfa849d3cc6b5f"],
					["0x11f0000000000a7415aadd546bc09d749aa85f36f3638941a78ecd0a8afcf1ef", "0xbab91ee10a41f3ae0912c6de12a6ffafb33a02205a49499589d0c2e91cc2aa6"],
					["0x1b300000000000d0536674cde69805ae12309cfbb107e6a614cf5493e5cf443b", "0x26c8d4a282bbf282ebf8644c474005034d861205571334c8df04cc82cb0f0ca5"],
					[20]
				);

				return true;
			} catch(e) {
				return false;
			}
		})
		.then((verfied) => {
			return assert.equal(verfied, false);
		})
		.then(async () => {
			let v = await voting.votes.call(2);
			return assert.equal(v.valueOf(), 0);
		});
	});

})