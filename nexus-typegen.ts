/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  List: { // root type
    id: string; // String!
    name: string; // String!
  }
  ListItem: { // root type
    id: string; // String!
    listId: string; // String!
    name: string; // String!
    votes: string[]; // [String!]!
  }
  Mutation: {};
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  List: { // field return type
    id: string; // String!
    items: NexusGenRootTypes['ListItem'][]; // [ListItem!]!
    name: string; // String!
  }
  ListItem: { // field return type
    id: string; // String!
    list: NexusGenRootTypes['List']; // List!
    listId: string; // String!
    name: string; // String!
    votes: string[]; // [String!]!
  }
  Mutation: { // field return type
    addItem: NexusGenRootTypes['ListItem']; // ListItem!
    addList: NexusGenRootTypes['List']; // List!
    deleteList: NexusGenRootTypes['List']; // List!
    voteItem: NexusGenRootTypes['ListItem']; // ListItem!
  }
  Query: { // field return type
    getAllItems: NexusGenRootTypes['ListItem'][]; // [ListItem!]!
    getItemsFromList: NexusGenRootTypes['ListItem'][]; // [ListItem!]!
    lists: NexusGenRootTypes['List'][]; // [List!]!
  }
}

export interface NexusGenFieldTypeNames {
  List: { // field return type name
    id: 'String'
    items: 'ListItem'
    name: 'String'
  }
  ListItem: { // field return type name
    id: 'String'
    list: 'List'
    listId: 'String'
    name: 'String'
    votes: 'String'
  }
  Mutation: { // field return type name
    addItem: 'ListItem'
    addList: 'List'
    deleteList: 'List'
    voteItem: 'ListItem'
  }
  Query: { // field return type name
    getAllItems: 'ListItem'
    getItemsFromList: 'ListItem'
    lists: 'List'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addItem: { // args
      listId: string; // String!
      name: string; // String!
      userId: string; // String!
    }
    addList: { // args
      name: string; // String!
    }
    deleteList: { // args
      id: string; // String!
    }
    voteItem: { // args
      itemId: string; // String!
      userId: string; // String!
    }
  }
  Query: {
    getItemsFromList: { // args
      listId: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}