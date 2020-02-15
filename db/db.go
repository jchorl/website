package db

import (
	"context"
	"log"

	"cloud.google.com/go/datastore"

	"github.com/jchorl/website/config"
)

func NewClient(ctx context.Context) *datastore.Client {
	client, err := datastore.NewClient(ctx, config.ProjectID)
	if err != nil {
		log.Fatalf("creating db client: %v", err)
	}

	return client
}
