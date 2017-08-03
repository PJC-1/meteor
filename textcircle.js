// creating a collection, using 'this' to give access to a package later
this.Documents = new Mongo.Collection("documents");

if (Meteor.isClient){


		// update the Session
		Meteor.setInterval(function(){
				Session.set("current_date", new Date());
		}, 1000);

		Template.date_display.helpers({
				current_date:function(){
						return Session.get("current_date");
				}
		});

		Template.editor.helpers({
				docid:function(){
						console.log("doc _id helper");
						console.log(Documents.findOne());
						var doc = Documents.findOne();
						if (doc){
								return doc._id;
						} else {
								return undefined;
						}
				}
		});
}

if (Meteor.isServer){
	Meteor.startup(function(){
		// code to run on server at startup
		if (!Documents.findOne()){ //no documents yet!
				Documents.insert({title:"my new document"});
		}
	});
}
